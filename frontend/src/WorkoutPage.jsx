import React, { useState } from "react";
import "./WorkoutPage.css"; // Custom CSS for additional styling

const WorkoutPage = () => {
  // Static data for exercises categorized by goals
  const exercisesByGoal = {
    "Weight Loss": [
      {
        id: 1,
        name: "Running",
        duration: "30 minutes",
        advantages: [
          "Improves cardiovascular health",
          "Burns calories",
          "Boosts mood",
        ],
        frequency: "3-5 times a week",
        color: "#ff9a9e", // Solid color for background
      },
      {
        id: 2,
        name: "Jump Rope",
        duration: "15 minutes",
        advantages: [
          "Improves coordination",
          "Burns calories quickly",
          "Portable and easy to do",
        ],
        frequency: "3 times a week",
        color: "#a1c4fd", // Solid color for background
      },
      {
        id: 3,
        name: "Cycling",
        duration: "45 minutes",
        advantages: [
          "Low impact on joints",
          "Improves leg strength",
          "Burns calories",
        ],
        frequency: "3-4 times a week",
        color: "#fbc2eb", // Solid color for background
      },
      {
        id: 4,
        name: "HIIT",
        duration: "20 minutes",
        advantages: [
          "Burns calories in a short time",
          "Improves metabolism",
          "No equipment needed",
        ],
        frequency: "3 times a week",
        color: "#84fab0", // Solid color for background
      },
      {
        id: 5,
        name: "Swimming",
        duration: "30 minutes",
        advantages: [
          "Full-body workout",
          "Low impact on joints",
          "Improves lung capacity",
        ],
        frequency: "3 times a week",
        color: "#a6c0fe", // Solid color for background
      },
    ],
    "Weight Gain": [
      {
        id: 6,
        name: "Bench Press",
        duration: "30 minutes",
        advantages: [
          "Builds chest muscles",
          "Improves upper body strength",
          "Increases muscle mass",
        ],
        frequency: "3 sets of 10 reps, 3 times a week",
        color: "#f6d365", // Solid color for background
      },
      {
        id: 7,
        name: "Deadlift",
        duration: "30 minutes",
        advantages: [
          "Builds back and leg muscles",
          "Improves posture",
          "Increases overall strength",
        ],
        frequency: "3 sets of 8 reps, 3 times a week",
        color: "#ff9a9e", // Solid color for background
      },
      {
        id: 8,
        name: "Squats",
        duration: "30 minutes",
        advantages: [
          "Builds leg and glute muscles",
          "Improves mobility",
          "Increases muscle mass",
        ],
        frequency: "3 sets of 12 reps, 3 times a week",
        color: "#a1c4fd", // Solid color for background
      },
      {
        id: 9,
        name: "Pull-ups",
        duration: "20 minutes",
        advantages: [
          "Builds back and arm muscles",
          "Improves grip strength",
          "Increases upper body strength",
        ],
        frequency: "3 sets of 10 reps, 3 times a week",
        color: "#fbc2eb", // Solid color for background
      },
      {
        id: 10,
        name: "Dumbbell Rows",
        duration: "20 minutes",
        advantages: [
          "Builds back muscles",
          "Improves posture",
          "Increases muscle mass",
        ],
        frequency: "3 sets of 12 reps, 3 times a week",
        color: "#84fab0", // Solid color for background
      },
    ],
    "Belly Loss": [
      {
        id: 11,
        name: "Plank",
        duration: "1 minute",
        advantages: [
          "Strengthens core muscles",
          "Improves posture",
          "Reduces belly fat",
        ],
        frequency: "3 sets, 3 times a week",
        color: "#a6c0fe", // Solid color for background
      },
      {
        id: 12,
        name: "Russian Twists",
        duration: "15 minutes",
        advantages: [
          "Targets oblique muscles",
          "Improves core strength",
          "Burns belly fat",
        ],
        frequency: "3 sets of 20 reps, 3 times a week",
        color: "#f6d365", // Solid color for background
      },
      {
        id: 13,
        name: "Mountain Climbers",
        duration: "20 minutes",
        advantages: [
          "Burns calories quickly",
          "Improves core strength",
          "Targets belly fat",
        ],
        frequency: "3 sets of 30 reps, 3 times a week",
        color: "#ff9a9e", // Solid color for background
      },
      {
        id: 14,
        name: "Bicycle Crunches",
        duration: "15 minutes",
        advantages: [
          "Targets lower abs",
          "Improves core strength",
          "Burns belly fat",
        ],
        frequency: "3 sets of 20 reps, 3 times a week",
        color: "#a1c4fd", // Solid color for background
      },
      {
        id: 15,
        name: "Leg Raises",
        duration: "15 minutes",
        advantages: [
          "Targets lower abs",
          "Improves core strength",
          "Reduces belly fat",
        ],
        frequency: "3 sets of 15 reps, 3 times a week",
        color: "#fbc2eb", // Solid color for background
      },
    ],
  };

  const [selectedExercise, setSelectedExercise] = useState(null);

  const handleExerciseClick = (exercise) => {
    setSelectedExercise(exercise);
  };

  const handleClosePopup = () => {
    setSelectedExercise(null);
  };

  return (
    <div className="workout-page">
      <h1 className="text-center my-4">Workout Exercises</h1>

      {/* Sections for Each Goal */}
      {Object.entries(exercisesByGoal).map(([goal, exercises]) => (
        <section key={goal} className="goal-section">
          <h2 className="text-center mb-4">{goal}</h2>
          <div className="exercise-container">
            {exercises.map((exercise) => (
              <div
                key={exercise.id}
                className="exercise-card"
                style={{ background: exercise.color }}
                onClick={() => handleExerciseClick(exercise)}
              >
                <h3 className="text-white text-center">{exercise.name}</h3>
              </div>
            ))}
          </div>
        </section>
      ))}

      {/* Popup for Selected Exercise */}
      {selectedExercise && (
        <div className="popup-overlay">
          <div className="popup-content">
            <h2>{selectedExercise.name}</h2>
            <p><strong>Duration:</strong> {selectedExercise.duration}</p>
            <p><strong>Frequency:</strong> {selectedExercise.frequency}</p>
            <h3>Advantages:</h3>
            <ul>
              {selectedExercise.advantages.map((advantage, index) => (
                <li key={index}>{advantage}</li>
              ))}
            </ul>
            <button
              className="btn btn-primary"
              onClick={handleClosePopup}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default WorkoutPage;