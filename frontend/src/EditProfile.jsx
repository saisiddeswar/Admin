import { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { toast } from "react-toastify";
import "./EditProfile.css"; // Custom CSS for styling

const EditProfile = ({ show, onHide, userHealth, userId }) => {
  const [formData, setFormData] = useState({
    gender: "",
    age: "",
    activityLevel: "",
    height: { value: "", unit: "cm" },
    weight: { value: "", unit: "kg" },
    medicalConditions: [],
    otherCondition: "",
    selectedGoals: [],
  });

  const [isEdited, setIsEdited] = useState(false); // Track if changes are made

  // Initialize form data when userHealth changes
  useEffect(() => {
    if (userHealth) {
      setFormData(userHealth);
    }
  }, [userHealth]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setIsEdited(true); // Enable Save button
  };

  const handleNestedChange = (e) => {
    const { name, value } = e.target;
    const [parent, child] = name.split(".");
    setFormData((prevData) => ({
      ...prevData,
      [parent]: {
        ...prevData[parent],
        [child]: value,
      },
    }));
    setIsEdited(true); // Enable Save button
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `http://localhost:5000/api/auth/health-data/${userId}`,
        formData
      );
      toast.success("Profile updated successfully!");
      onHide(); // Close the modal
      setIsEdited(false); // Reset edited state
    } catch (error) {
      toast.error("Failed to update profile.");
      console.error("Error updating profile:", error);
    }
  };

  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>Edit Profile</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Gender</Form.Label>
            <Form.Select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Age</Form.Label>
            <Form.Control
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Activity Level</Form.Label>
            <Form.Select
              name="activityLevel"
              value={formData.activityLevel}
              onChange={handleChange}
            >
              <option value="Lazy">Lazy</option>
              <option value="Active">Active</option>
              <option value="Hyperactive">Hyperactive</option>
              <option value="Average">Average</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Height</Form.Label>
            <div className="d-flex gap-2">
              <Form.Control
                type="number"
                name="height.value"
                value={formData.height.value}
                onChange={handleNestedChange}
              />
              <Form.Select
                name="height.unit"
                value={formData.height.unit}
                onChange={handleNestedChange}
              >
                <option value="cm">cm</option>
                <option value="inches">inches</option>
                <option value="feet">feet</option>
              </Form.Select>
            </div>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Weight</Form.Label>
            <div className="d-flex gap-2">
              <Form.Control
                type="number"
                name="weight.value"
                value={formData.weight.value}
                onChange={handleNestedChange}
              />
              <Form.Select
                name="weight.unit"
                value={formData.weight.unit}
                onChange={handleNestedChange}
              >
                <option value="kg">kg</option>
                <option value="lbs">lbs</option>
              </Form.Select>
            </div>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Medical Conditions</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="medicalConditions"
              value={formData.medicalConditions.join(", ")}
              onChange={(e) => {
                setFormData({
                  ...formData,
                  medicalConditions: e.target.value.split(", "),
                });
                setIsEdited(true);
              }}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Other Conditions</Form.Label>
            <Form.Control
              type="text"
              name="otherCondition"
              value={formData.otherCondition}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Goals</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="selectedGoals"
              value={formData.selectedGoals.join(", ")}
              onChange={(e) => {
                setFormData({
                  ...formData,
                  selectedGoals: e.target.value.split(", "),
                });
                setIsEdited(true);
              }}
            />
          </Form.Group>

          {isEdited && (
            <Button variant="primary" type="submit">
              Save Changes
            </Button>
          )}
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default EditProfile;