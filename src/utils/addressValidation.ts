const PARIS_COORDINATES = { lat: 48.8566, lon: 2.3522 };

function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371; // Earth's radius in km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
}

export async function validateAddress(address: string): Promise<{ isValid: boolean; message: string }> {
  try {
    const response = await fetch(`https://api-adresse.data.gouv.fr/search/?q=${encodeURIComponent(address)}&limit=1`);
    const data = await response.json();

    if (data.features && data.features.length > 0) {
      const [lon, lat] = data.features[0].geometry.coordinates;
      const distance = calculateDistance(PARIS_COORDINATES.lat, PARIS_COORDINATES.lon, lat, lon);

      if (distance <= 50) {
        return { isValid: true, message: 'Address is valid and within 50km of Paris.' };
      } else {
        return { isValid: false, message: `Address is ${distance.toFixed(2)}km from Paris, which exceeds the 50km limit.` };
      }
    } else {
      return { isValid: false, message: 'Address not found. Please enter a valid French address.' };
    }
  } catch (error) {
    console.error('Error validating address:', error);
    return { isValid: false, message: 'An error occurred while validating the address. Please try again.' };
  }
}