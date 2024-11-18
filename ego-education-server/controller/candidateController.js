const { createConnection } = require("../config/db");

async function insertFormDataAndFile(formData, fileData) {
  try {
    const base64File = fileData.buffer.toString("base64");

    const connection = createConnection(); // Use the createConnection function
    const sql =
      "INSERT INTO your_table (firstName, lastName, email, phoneNumber, program, document) VALUES (?, ?, ?, ?, ?, ?)";
    const values = [
      formData.firstName,
      formData.lastName,
      formData.email,
      formData.phoneNumber,
      formData.program,
      base64File,
    ];
    await connection.query(sql, values);
    connection.end(); // Close the connection
    return true; // Successful insertion
  } catch (error) {
    console.error("Error inserting form data and file data:", error);
    return false; // Failed insertion
  }
}


async function submitForm(req, res) {
  try {
    const formData = req.body; // Form data (first name, last name, etc.)
    const fileData = req.file; 
    console.log(fileData)

    // Check if file was uploaded
    if (!fileData) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    // Insert form data and file data into database
    const result = await insertFormDataAndFile(formData, fileData);
    res.status(200).json({ success: true });
  } catch (error) {
    console.error("Error handling form submission:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

module.exports = {
    submitForm, // Export both functions together
    insertFormDataAndFile
  };