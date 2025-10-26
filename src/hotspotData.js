export const hotspots = {

  kitchen: {

    isUnlocked: true,
    narrative: "Durchsuche zunächst die Küche.",

    smallPlants: {
      scale: 4,
      originX: 3250,
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
          left: "center",
          bottom: 450,
      }
    },
  
    bigPlant: {
      scale: 3,
      originX: 5100,
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
        left: "center",
        top: 350,
      }
    },

    image: {
      scale: 3,
      originX: 5200,
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
        left: "center",
        bottom: 450,
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
        left: "center",
        top: 350,
      }
    },

    view: {
      scale: 2.5,
      originX: 5464,
      originY: 1525, 
      hasBeenClicked: false,
      text: {
        name: { title: "...", data: "..." },
        year: { title: "...", data: "..." },
        status: { title: "...", data: "..." },
        belongsTo: { title: "...", data: "..." },
      },
      comment: "...",
      textLocation: {
        left: 500,
        top: "center",
      }
    },

    fridge: {
      scale: 2.3,
      originX: 700,
      originY: 1500, 
      hasBeenClicked: false,
      text: {
        name: { title: "...", data: "..." },
        year: { title: "...", data: "..." },
        status: { title: "...", data: "..." },
        belongsTo: { title: "...", data: "..." },
      },
      comment: "Schau besser mal rein.",
      textLocation: {
          right: "center",
          bottom: 400,
      }
    },

    fridgeActivated: {
      scale: 2.3,
      originX: 700,
      originY: 1500, 
    },

    pomegranate: {
      hasBeenClicked: false,
      text: {
        name: { title: "...", data: "..." },
        year: { title: "...", data: "..." },
        status: { title: "...", data: "..." },
        belongsTo: { title: "...", data: "..." },
      },
      comment: "Wie klein du damals noch warst!",
      textLocation: {
          right: 300,
          bottom: "center",
      }
    },

    liquids: {
      hasBeenClicked: false,
      text: {
        name: { title: "...", data: "..." },
        year: { title: "...", data: "..." },
        status: { title: "...", data: "..." },
        belongsTo: { title: "...", data: "..." },
      },
      comment: "Wie klein du damals noch warst!",
      textLocation: {
          right: 300,
          bottom: "center",
      }
    },

    meat: { 
      hasBeenClicked: false,
      text: {
        name: { title: "...", data: "..." },
        year: { title: "...", data: "..." },
        status: { title: "...", data: "..." },
        belongsTo: { title: "...", data: "..." },
      },
      comment: "Wie klein du damals noch warst!",
      textLocation: {
          right: 300,
          bottom: "center",
      }
    },
  }
};
