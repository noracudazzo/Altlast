export const hotspots = {

  kitchen: {

    isUnlocked: true,
    narrative: "Durchsuche zunächst die Küche.",

    smallPlants: {
      scale: 4,
      originX: 3200,
      originY: 1200, 
      hasBeenClicked: false,
      text: {
        name: { title: "Objektname", data: "GreenUnit Delta" },
        year: { title: "Herstellungsjahr", data: "..." },
        status: { title: "Status", data: "Gesund, automatische Bewässerung aktiv" },
        belongsTo: { title: "Zugehörigkeit", data: "Privathaushalt" },
        license: { title: "Lizenz", data: "Urban Gardening"}
      },
      textLocation: {
          left: "50%",
          bottom: "15%",
      }
    },
  
    bigPlant: {
      scale: 3,
      originX: 5000,
      originY: 2750, 
      hasBeenClicked: false,
      text: {
        name: { title: "Objektname", data: "FoodSynth Sixteen" },
        year: { title: "Herstellungsjahr", data: "55" },
        status: { title: "Status", data: "Aktiv, Kühlsystem stabil" },
        belongsTo: { title: "Zugehörigkeit", data: "Privathaushalt"},
        license: { title: "Lizenz", data: "Lizenz: Standard Living Unit"},
      },
      comment: "...",
      textLocation: {
          left: "12%",
          top: "10%",
      }
    },

    image: {
      scale: 3,
      originX: 5000,
      originY: 1000, 
      hasBeenClicked: false,
      text: {
        name: { title: "...", data: "..." },
        year: { title: "...", data: "..." },
        status: { title: "...", data: "..." },
        belongsTo: { title: "...", data: "..." },
      },
      comment: "Wie klein du damals noch warst!",
      textLocation: {
          left: "50%",
          bottom: "15%",
      }
    },

    kitchenMachine: {
      scale: 3,
      originX: 3000,
      originY: 2100, 
      hasBeenClicked: false,
      text: {
        name: { title: "Objektname", data: "FoodSynth Sixteen 1" },
        year: { title: "Herstellungsjahr", data: "55" },
        status: { title: "Status", data: "Aktiv, Kühlsystem stabil" },
        belongsTo: { title: "Zugehörigkeit", data: "Privathaushalt" },
        license: { title: "Lizenz", data: "Standard Living Unit"}
      },
      comment: "...",
      textLocation: {
          left: "50%",
          top: "7%",
      }
    },

    view: {
      scale: 2.5,
      originX: 5464,
      originY: 1700, 
      hasBeenClicked: false,
      text: {
        name: { title: "...", data: "..." },
        year: { title: "...", data: "..." },
        status: { title: "...", data: "..." },
        belongsTo: { title: "...", data: "..." },
      },
      comment: "...",
      textLocation: {
          left: "10%",
          top: "40%",
      }
    },

    fridge: {
      scale: 3,
      originX: 800,
      originY: 1650, 
      hasBeenClicked: false,
      text: {
        name: { title: "...", data: "..." },
        year: { title: "...", data: "..." },
        status: { title: "...", data: "..." },
        belongsTo: { title: "...", data: "..." },
      },
      comment: "Schau besser mal rein.",
      textLocation: {
          right: "15%",
          bottom: "15%",
      }
    },

    fridgeActivated: {
      scale: 2.2,
      originX: 400,
      originY: 1600, 
    },

    pomegranate: {
      scale: 5,
      originX: 1100,
      originY: 2100, 
      hasBeenClicked: false,
      text: {
        name: { title: "...", data: "..." },
        year: { title: "...", data: "..." },
        status: { title: "...", data: "..." },
        belongsTo: { title: "...", data: "..." },
      },
      comment: "Wie klein du damals noch warst!",
      textLocation: {
          left: "50%",
          bottom: "15%",
      }
    },

    liquids: {
      scale: 3.5,
      originX: 900,
      originY: 1200, 
      hasBeenClicked: false,
      text: {
        name: { title: "...", data: "..." },
        year: { title: "...", data: "..." },
        status: { title: "...", data: "..." },
        belongsTo: { title: "...", data: "..." },
      },
      comment: "Wie klein du damals noch warst!",
      textLocation: {
          left: "50%",
          bottom: "15%",
      }
    },

    meat: {
      scale: 5,
      originX: 1000,
      originY: 1800, 
      hasBeenClicked: false,
      text: {
        name: { title: "...", data: "..." },
        year: { title: "...", data: "..." },
        status: { title: "...", data: "..." },
        belongsTo: { title: "...", data: "..." },
      },
      comment: "Wie klein du damals noch warst!",
      textLocation: {
          left: "50%",
          bottom: "15%",
      }
    },

  }
};
