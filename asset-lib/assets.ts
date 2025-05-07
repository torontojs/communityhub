export function convertHexToRGB(hex) {
    // Remove the '#' if it's included in the input
    hex = hex.replace(/^#/, '');
  
    // Parse the hex values into separate R, G, and B values
    const red = parseInt(hex.substring(0, 2), 16);
    const green = parseInt(hex.substring(2, 4), 16);
    const blue = parseInt(hex.substring(4, 6), 16);
  
    // Return the RGB values in an object
    return {
      red: red,
      green: green,
      blue: blue,
    };
  }