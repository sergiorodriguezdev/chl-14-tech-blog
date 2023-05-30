module.exports = {
    format_date: (date) => {
      return new Date(date).toLocaleDateString();
    },
    to_json: (obj) => {
      return JSON.stringify(obj);
    }
  }; 