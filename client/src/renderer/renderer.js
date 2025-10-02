// DOM Elements
const statusIndicator = document.getElementById('statusIndicator');
const statusText = document.getElementById('statusText');
const summonerInput = document.getElementById('summonerName');
const regionSelect = document.getElementById('region');
const championBtn = document.getElementById('championBtn');
const buildBtn = document.getElementById('buildBtn');
const resultsContainer = document.getElementById('resultsContainer');

// Check backend health on load
async function checkBackendHealth() {
    try {
        const result = await window.electronAPI.checkHealth();
        if (result.success) {
            statusIndicator.classList.add('connected');
            statusText.textContent = 'Connected';
        } else {
            throw new Error(result.error);
        }
    } catch (error) {
        statusIndicator.classList.add('error');
        statusText.textContent = 'Backend Offline';
        console.error('Health check failed:', error);
    }
}

// Display results
function displayResults(data, type) {
    let html = '';
    
    if (type === 'champion') {
        html = `
            <div class="result-item">
                <h3>Champion Recommendation</h3>
                <p><strong>Summoner:</strong> ${data.summoner} (${data.region.toUpperCase()})</p>
                <p><strong>Recommended Champion:</strong> ${data.recommendation.champion}</p>
                <p><strong>Reason:</strong> ${data.recommendation.reason}</p>
                <p><strong>Confidence:</strong> ${(data.recommendation.confidence * 100).toFixed(0)}%</p>
                ${data.message ? `<div class="message-info">${data.message}</div>` : ''}
            </div>
        `;
    } else if (type === 'build') {
        html = `
            <div class="result-item">
                <h3>Build Recommendation</h3>
                <p><strong>Summoner:</strong> ${data.summoner} (${data.region.toUpperCase()})</p>
                <p><strong>Recommended Items:</strong></p>
                <ul style="margin-left: 20px; color: #d1d5db;">
                    ${data.build.items.map(item => `<li>${item}</li>`).join('')}
                </ul>
                <p><strong>Recommended Runes:</strong></p>
                <ul style="margin-left: 20px; color: #d1d5db;">
                    ${data.build.runes.map(rune => `<li>${rune}</li>`).join('')}
                </ul>
                ${data.message ? `<div class="message-info">${data.message}</div>` : ''}
            </div>
        `;
    }
    
    resultsContainer.innerHTML = html;
}

// Display error
function displayError(message) {
    resultsContainer.innerHTML = `
        <div class="result-item" style="border-left: 3px solid #ef4444;">
            <h3 style="color: #ef4444;">Error</h3>
            <p>${message}</p>
        </div>
    `;
}

// Display loading
function displayLoading(message) {
    resultsContainer.innerHTML = `
        <div style="text-align: center; padding: 40px;">
            <div class="loading"></div>
            <p style="margin-top: 16px; color: #8b92a7;">${message}</p>
        </div>
    `;
}

// Get champion recommendation
championBtn.addEventListener('click', async () => {
    const summonerName = summonerInput.value.trim();
    const region = regionSelect.value;
    
    if (!summonerName) {
        displayError('Please enter a summoner name');
        return;
    }
    
    championBtn.disabled = true;
    buildBtn.disabled = true;
    displayLoading('Getting champion recommendation...');
    
    try {
        const result = await window.electronAPI.getChampionRecommendation({
            summoner_name: summonerName,
            region: region
        });
        
        if (result.success) {
            displayResults(result.data, 'champion');
        } else {
            throw new Error(result.error);
        }
    } catch (error) {
        displayError(`Failed to get recommendation: ${error.message}`);
    } finally {
        championBtn.disabled = false;
        buildBtn.disabled = false;
    }
});

// Get build recommendation
buildBtn.addEventListener('click', async () => {
    const summonerName = summonerInput.value.trim();
    const region = regionSelect.value;
    
    if (!summonerName) {
        displayError('Please enter a summoner name');
        return;
    }
    
    championBtn.disabled = true;
    buildBtn.disabled = true;
    displayLoading('Getting build recommendation...');
    
    try {
        const result = await window.electronAPI.getBuildRecommendation({
            summoner_name: summonerName,
            region: region
        });
        
        if (result.success) {
            displayResults(result.data, 'build');
        } else {
            throw new Error(result.error);
        }
    } catch (error) {
        displayError(`Failed to get recommendation: ${error.message}`);
    } finally {
        championBtn.disabled = false;
        buildBtn.disabled = false;
    }
});

// Initialize
checkBackendHealth();

