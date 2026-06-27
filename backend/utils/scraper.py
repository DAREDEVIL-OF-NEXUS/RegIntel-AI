import requests
from bs4 import BeautifulSoup
import logging

logger = logging.getLogger(__name__)

def scrape_rbi_notifications() -> list:
    """
    Scrapes the latest notifications from the RBI website.
    Note: This is an online-only feature.
    """
    url = "https://www.rbi.org.in/Scripts/BS_PressReleaseDisplay.aspx"
    try:
        headers = {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
        }
        response = requests.get(url, headers=headers, timeout=10)
        response.raise_for_status()
        
        soup = BeautifulSoup(response.content, 'html.parser')
        
        # Simplified extraction logic for hackathon purposes
        links = []
        for a_tag in soup.find_all('a', href=True):
            if "PR" in a_tag['href'] or "Notification" in a_tag.text:
                links.append({
                    "title": a_tag.text.strip()[:100],
                    "link": f"https://www.rbi.org.in{a_tag['href']}" if a_tag['href'].startswith('/') else a_tag['href']
                })
        
        return links[:10]  # Return top 10 recent
    except Exception as e:
        logger.error(f"Failed to scrape RBI: {e}")
        raise ValueError(f"Web scraping failed. Error: {e}")
