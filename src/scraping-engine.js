// High-performance background processor
import ScrapingEngine from './scraping-engine.js';
import JobManager from './job-manager.js';

const scrapingEngine = new ScrapingEngine();
const jobManager = new JobManager();

// Message handler for high-speed communication
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  // Async response pattern
  (async () => {
    switch (request.action) {
      case 'quickScrape':
        const result = await handleQuickScrape(request, sender.tab);
        sendResponse(result);
        break;
        
      case 'batchScrape':
        const jobId = await jobManager.createBatchJob(request);
        sendResponse({ jobId, status: 'started' });
        break;
        
      case 'getJobStatus':
        const status = jobManager.getJobStatus(request.jobId);
        sendResponse(status);
        break;
        
      case 'exportData':
        await handleExport(request.data, request.format);
        sendResponse({ success: true });
        break;
    }
  })();
  
  return true; // Keep message channel open for async
});

async function handleQuickScrape(request, tab) {
  const startTime = performance.now();
  
  try {
    // Execute content script with optimized parameters
    const [result] = await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: scrapePage,
      args: [request.config]
    });
    
    const processingTime = performance.now() - startTime;
    
    // Performance logging
    if (processingTime > 100) {
      console.warn(`Scraping took ${processingTime}ms, optimizing...`);
    }
    
    return {
      success: true,
      data: result.result,
      stats: {
        time: processingTime,
        rows: result.result?.length || 0,
        size: JSON.stringify(result.result).length
      }
    };
  } catch (error) {
    return {
      success: false,
      error: error.message
    };
  }
}

// Injected function for content script execution
function scrapePage(config) {
  // This function gets stringified and injected
  return window.hyperScraperAPI.scrape(config);
}

async function handleExport(data, format) {
  const exporter = new DataExporter();
  return await exporter.export(data, format);
}