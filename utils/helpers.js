module.exports = {
    format_date: (date) => {
      return new Date(date).toLocaleDateString(); // Format date in MM/dd/yyyy
    },
    to_json: (obj) => {
      return JSON.stringify(obj); // Convert object to JSON string
    }
  }; 