import React, { useState } from "react";
import axios from "axios";
import "./style.css"; // Import CSS file for styling

const SuggestionForm = () => {
  const [formData, setFormData] = useState({
    age: "",
    gender: "",
    activityLevel: "",
    height: { value: "", unit: "cm" },
    weight: { value: "", unit: "kg" },
    medicalConditions: [],
    otherCondition: "",
    selectedGoals: [],
  });
  const [suggestions, setSuggestions] = useState([]); // Store top 5 suggestions
  const [selectedSuggestion, setSelectedSuggestion] = useState(""); // Store the user's selected suggestion
  const [loading, setLoading] = useState(false); // Loading state
  const [showPopup, setShowPopup] = useState(false); // Popup visibility

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleNestedChange = (e, parentField) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [parentField]: { ...formData[parentField], [name]: value },
    });
  };

  const handleArrayChange = (e, field) => {
    const { value, checked } = e.target;
    if (checked) {
      setFormData({ ...formData, [field]: [...formData[field], value] });
    } else {
      setFormData({
        ...formData,
        [field]: formData[field].filter((item) => item !== value),
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const prompt = `Give me 5 fitness suggestions for a ${formData.age}-year-old ${formData.gender} with a ${formData.activityLevel} activity level, ${formData.height.value} ${formData.height.unit} tall, ${formData.weight.value} ${formData.weight.unit} weight, medical conditions: ${formData.medicalConditions.join(", ")}, and goals: ${formData.selectedGoals.join(", ")}.`;

      const response = await axios.post(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=YOUR_API_KEY`,
        {
          contents: [
            {
              parts: [
                {
                  text: prompt,
                },
              ],
            },
          ],
        }
      );

      const aiResponse = response.data.candidates[0].content.parts[0].text;
      const suggestionsList = aiResponse.split("\n").slice(0, 5); // Get top 5 suggestions
      setSuggestions(suggestionsList);
      setSelectedSuggestion(""); // Clear any previously selected suggestion
    } catch (error) {
      console.error("Error fetching suggestions:", error);
      setSuggestions([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectSuggestion = (suggestion) => {
    setSelectedSuggestion(suggestion);
    setShowPopup(true); // Show popup when a suggestion is selected
  };

  const handleClosePopup = () => {
    setShowPopup(false); // Hide popup
  };

  return (
    <div className="container">
      <h1>Get Personalized Fitness Suggestions</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Age:</label>
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Gender:</label>
          <select name="gender" value={formData.gender} onChange={handleChange} required>
            <option value="">Select</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>

        <div className="form-group">
          <label>Activity Level:</label>
          <select name="activityLevel" value={formData.activityLevel} onChange={handleChange} required>
            <option value="">Select</option>
            <option value="sedentary">Sedentary</option>
            <option value="lightly active">Lightly Active</option>
            <option value="moderately active">Moderately Active</option>
            <option value="very active">Very Active</option>
          </select>
        </div>

        <div className="form-group">
          <label>Height:</label>
          <input
            type="number"
            name="value"
            value={formData.height.value}
            onChange={(e) => handleNestedChange(e, "height")}
            required
          />
          <select
            name="unit"
            value={formData.height.unit}
            onChange={(e) => handleNestedChange(e, "height")}
            required
          >
            <option value="cm">cm</option>
            <option value="inches">inches</option>
            <option value="feet">feet</option>
          </select>
        </div>

        <div className="form-group">
          <label>Weight:</label>
          <input
            type="number"
            name="value"
            value={formData.weight.value}
            onChange={(e) => handleNestedChange(e, "weight")}
            required
          />
          <select
            name="unit"
            value={formData.weight.unit}
            onChange={(e) => handleNestedChange(e, "weight")}
            required
          >
            <option value="kg">kg</option>
            <option value="lbs">lbs</option>
          </select>
        </div>

        <div className="form-group">
          <label>Medical Conditions:</label>
          {["Diabetes", "Hypertension", "Asthma", "None"].map((condition) => (
            <label key={condition} className="checkbox-label">
              <input
                type="checkbox"
                name="medicalConditions"
                value={condition}
                checked={formData.medicalConditions.includes(condition)}
                onChange={(e) => handleArrayChange(e, "medicalConditions")}
              />
              {condition}
            </label>
          ))}
        </div>

        <div className="form-group">
          <label>Goals:</label>
          {["Weight Loss", "Muscle Gain", "Improve Fitness", "General Health"].map((goal) => (
            <label key={goal} className="checkbox-label">
              <input
                type="checkbox"
                name="selectedGoals"
                value={goal}
                checked={formData.selectedGoals.includes(goal)}
                onChange={(e) => handleArrayChange(e, "selectedGoals")}
              />
              {goal}
            </label>
          ))}
        </div>

        <button type="submit" disabled={loading}>
          {loading ? "Loading..." : "Get Suggestions"}
        </button>
      </form>

      {suggestions.length > 0 && (
        <div className="suggestions-grid">
          {suggestions.map((suggestion, index) => (
            <div
              key={index}
              className="suggestion-box"
              onClick={() => handleSelectSuggestion(suggestion)}
            >
              {suggestion}
            </div>
          ))}
        </div>
      )}

      {showPopup && (
        <div className="popup">
          <div className="popup-content">
            <h2>Selected Suggestion</h2>
            <p>{selectedSuggestion}</p>
            <button onClick={handleClosePopup}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SuggestionForm;
