const modalTemplates = {
    form: function() {
      return `
        <form>
          <label for="name">Name:</label>
          <input type="text" id="name" name="name"><br>
          <label for="email">Email:</label>
          <input type="email" id="email" name="email"><br>
          <input type="submit" value="Submit">
        </form>
      `;
    },
    info: function() {
      return `
        <h2>Information</h2>
        <p>Some information here...</p>
      `;
    }
  };
