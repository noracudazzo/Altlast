export const hotspots = {

  hallway: {

    isUnlocked: true,
    startNarrative: "Hi.",
    narrative: "Fahre in den 16. Stock.",
    canBeLeft: false,

    ventilation1: {
      scale: 4,
      originX: 0,
      originY: 500, 
      hasBeenClicked: false,
      text: {
        name: { title: "Objektname", data: "GreenUnit Delta II" },
        year: { title: "Herstellungsjahr", data: "52" },
        status: { title: "Status", data: "Gesund" },
        belongsTo: { title: "Zugehörigkeit", data: "Privathaushalt" },
      },
      textLocation: {
          left: "center",
          bottom: 450,
      }
    },

    ventilation2: {
      scale: 4,
      originX: 5464,
      originY: 500, 
      hasBeenClicked: false,
      text: {
        name: { title: "Objektname", data: "GreenUnit Delta II" },
        year: { title: "Herstellungsjahr", data: "52" },
        status: { title: "Status", data: "Gesund" },
        belongsTo: { title: "Zugehörigkeit", data: "Privathaushalt" },
      },
      textLocation: {
          left: "center",
          bottom: 450,
      }
    },

    stats: {
      scale: 4,
      originX: 800,
      originY: 1450, 
      hasBeenClicked: false,
      text: {
        name: { title: "Objektname", data: "GreenUnit Delta II" },
        year: { title: "Herstellungsjahr", data: "52" },
        status: { title: "Status", data: "Gesund" },
        belongsTo: { title: "Zugehörigkeit", data: "Privathaushalt" },
      },
      textLocation: {
          left: "center",
          bottom: 450,
      }
    },

    controls: {
      scale: 2.75,
      originX: 5000,
      originY: 1450, 
      hasBeenClicked: false,
      falseClickMessage: "Das Aufzug Control Panel ist momentan nur für den 26. Stock freigeschalten."
    },
  },

  kitchen: {

    isUnlocked: true,
    narrative: "Durchsuche die Küche.",
    canBeLeft: true,

    smallPlants: {
      scale: 4,
      originX: 3250,
      originY: 1200, 
      hasBeenClicked: false,
      text: {
        name: { title: "Objektname", data: "GreenUnit Delta II" },
        year: { title: "Herstellungsjahr", data: "52" },
        status: { title: "Status", data: "Gesund" },
        belongsTo: { title: "Zugehörigkeit", data: "Privathaushalt" },
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
        name: { title: "Objektname", data: "GreenUnit Gamma C" },
        year: { title: "Herstellungsjahr", data: "53" },
        status: { title: "Status", data: "Gesund, automatische Bewässerung aktiv" },
        belongsTo: { title: "Zugehörigkeit", data: "Privathaushalt"},
      },
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
        name: { title: "Objektname", data: "MemoryFrame HIF-7" },
        year: { title: "Herstellungsjahr", data: "40" },
        status: { title: "Status", data: "Aktiv, Fotopanel noch zu 47% intakt" },
        belongsTo: { title: "Zugehörigkeit", data: "Unregistriert" },
        content: { title: "Inhalt", data: "Ellen #56890 mit Enkelkind." },
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
        year: { title: "Herstellungsjahr", data: "48" },
        status: { title: "Status", data: "Inaktiv" },
        belongsTo: { title: "Zugehörigkeit", data: "Privathaushalt" },
        description: { title: "Beschreibung", data: "Multifunktionale Küchenmaschine."},
      },
      textLocation: {
        left: "center",
        top: 300,
      }
    },

    view1: {
      scale: 2.5,
      originX: 0,
      originY: 1525, 
      hasBeenClicked: false,
      text: {
        name: { title: "Sichtbarer Bereich", data: "Komplex Ministerium für Harmonie" },
        year: { title: "Baujahr", data: "04" },
        belongsTo: { title: "Zugehörigkeit", data: "Cluster Mitte" },
        description: { title: "Beschreibung", data: "Ministerium für dein Wohlbefinden."},
      },
      textLocation: {
        right: 500,
        top: "center",
      }
    },

    view2: {
      scale: 2.5,
      originX: 5464,
      originY: 1525, 
      hasBeenClicked: false,
      text: {
        name: { title: "Sichtbarer Bereich", data: "Wohnkomplex 5D-F Mitte" },
        year: { title: "Baujahr", data: "19" },
        belongsTo: { title: "Zugehörigkeit", data: "Cluster Mitte" },
        description: { title: "Beschreibung", data: "Beliebtes Wohngebiet. "},
      },
      textLocation: {
        left: 500,
        top: "center",
      }
    },

    fridge: {
      scale: 2.3,
      originX: 1000,
      originY: 1500, 
      hasBeenClicked: false,
      text: {
        name: { title: "Objektname", data: "SmartFridge 6.0" },
        year: { title: "Herstellungsjahr", data: "48" },
        status: { title: "Status", data: "Aktiv, Kühlsystem stabil" },
        belongsTo: { title: "Zugehörigkeit", data: "Privathaushalt" },
        description: { title: "Beschreibung", data: "Hochmodernes, robustes Kühlsystem."},
      },
      comment: "Abgelaufene Lebensmittel? Das solltest du besser mal überprüfen.",
      textLocation: {
        right: 300,
        top: 1300,
      }
    },

    fridgeActivated: {
      scale: 2.3,
      originX: 1000,
      originY: 1500, 
    },

    pomegranate: {
      hasBeenClicked: false,
      text: {
        name: { title: "Objektname", data: "Punica granatum (Heritage fruit)" },
        year: { title: "Herstellungsjahr", data: "55" },
        location: { title: "Herstellungsort", data: "Hydroponikfarm Süd C" },
        status: { title: "Status", data: "Verdorben" },
        belongsTo: { title: "Zugehörigkeit", data: "Privathaushalt" },
        nutritionalValues: { title: "Nährstoffwerte", data: "Außergewöhnlich hoher Vitamingehalt"},
      },
      textLocation: {
        right: 300,
        top: 1300,
      }
    },

    liquids: {
      hasBeenClicked: false,
      text: {
        name: { title: "Objektname", data: "Verschiedene LiquidCalorie Rationen" },
        year: { title: "Herstellungsjahr", data: "55" },
        location: { title: "Herstellungsort", data: "VerticalFarm Nord D-LCZF" },
        status: { title: "Status", data: "Genießbar" },
        nutritionalValues: { title: "Nährstoffwerte", data: "Alle Nährstoffbedürfnisse abgedeckt"},
      },
      textLocation: {
        right: 300,
        top: 1300,
      }
    },

    meat: { 
      hasBeenClicked: false,
      text: {
        name: { title: "Objektname", data: "InVitro ProteinBase" },
        year: { title: "Herstellungsjahr", data: "55" },
        location: { title: "Herstellungsort", data: "CrueltyFree Basis Cluster E" },
        status: { title: "Status", data: "Genießbar" },
        nutritionalValues: { title: "Nährstoffwerte", data: "Hoher Proteingehalt"},
      },
      textLocation: {
        right: 300,
        top: 1300,
      }
    },
  },



  livingRoom: {

    isUnlocked: false,
    startNarrative: "Du hast die Küche fertig durchsucht. Durchsuche nun das Wohnzimmer.",
    narrative: "Durchsuche das Wohnzimmer.",

    smallPlants: {
      scale: 4,
      originX: 3250,
      originY: 1200, 
      hasBeenClicked: false,
      text: {
        name: { title: "Objektname", data: "GreenUnit Delta II" },
        year: { title: "Herstellungsjahr", data: "52" },
        status: { title: "Status", data: "Gesund" },
        belongsTo: { title: "Zugehörigkeit", data: "Privathaushalt" },
      },
      textLocation: {
          left: "center",
          bottom: 450,
      }
    },
  },
};
