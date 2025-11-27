export const data = {

  elevator: {

    displayName: "Aufzug",
    isUnlocked: true,
    startNarrative: [
      "Wie lange ist es her, dass du das letzte Mal in diesem Aufzug warst...", 
      "Ich wünschte, deine Rückkehr hätte nicht einen so traurigen Grund.", 
      "Aber es ist schön, dass du noch einmal durch die Wohnung gehen kannst, bevor das Wohnmodul neu vermittelt wird.", 
      "Vielleicht findest du dort das ein oder andere Erinnerungsstück an deine Oma.",
      "Und wie immer helfe ich dir gerne dabei, Gegenstände zu identifizieren und mehr über sie zu erfahren.",
      "In diesem Aufzug gibt es zum Beispiel auch ein paar interessante Objekte zu entdecken.",
      "Lass dir Zeit und schau dich um. Du bist schließlich am Trauern.",
      "Und sobald du dich bereit fühlst, fahre in den 16. Stock um zu Oma Ellens Wohnung zu gelangen.",
      "Du schaffst das. Ich glaube an dich.",
    ],
    narrative: "Fahre in den 16. Stock.",
    hasBeenEntered: true,
    canBeLeft: false,
    music: "mesa-10550.mp3",

    ventilation1: {
      scale: 4,
      originX: 0,
      originY: 500, 
      hasBeenClicked: false,
      text: {
        name: { title: "Objektname", data: "AirRefresher TX02 I" },
        year: { title: "Herstellungsjahr", data: "49" },
        status: { title: "Status", data: "Aktiv, Motor noch zu 78% intakt" },
        belongsTo: { title: "Zugehörigkeit", data: "Ministerium für Wohnen CM" },
      },
      comment: "Die Luftqualität hier drinnen ist ausgesprochen gut!",
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
        name: { title: "Objektname", data: "AirRefresher TX01" },
        year: { title: "Herstellungsjahr", data: "46" },
        status: { title: "Status", data: "Aktiv, Motor noch zu 60% intakt" },
        belongsTo: { title: "Zugehörigkeit", data: "Ministerium für Wohnen CM" },
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
        name: { title: "Objektname", data: "InfoPanel R-90" },
        year: { title: "Herstellungsjahr", data: "51" },
        status: { title: "Status", data: "Aktiv, Panel noch zu 82% intakt" },
        belongsTo: { title: "Zugehörigkeit", data: "Ministerium für Statistik" },
        content: { title: "Inhalt", data: "Die täglichen, landesweiten Statistiken." },
      },
      comment: "Tolle Nachrichten: Der ZI ist über Nacht um 1% gestiegen.",
      textLocation: {
          left: "center",
          bottom: 450,
      }
    },

    entrance: {
      scale: 4,
      originX: 2732,
      originY: 1536, 
      hasBeenClicked: false,
    },

    controls: {
      scale: 2.75,
      originX: 5000,
      originY: 1450, 
      hasBeenClicked: false,
      falseClickMessage: "Das Aufzug Control Panel ist momentan nur für den 26. Stock freigeschalten."
    },
  },

  hallway: {

    displayName: "Flur",
    isUnlocked: false,
    startNarrative: [
      "Wie du weißt, gelangst du von hier aus in jeden Raum.",
      "Du kannst jederzeit zurückkommen, um zu den restlichen Räumen zu gelangen.",
      "Als erstes solltest du dir allerdings die Küche ansehen.",
    ],
    narrative: "Durchsuche die Küche.",
    errorNarrative: "Schaue dir vollständig die Küche an, um in andere Räume zu gelangen.",
    hasBeenEntered: false,
    canBeLeft: false,
    music: "moebius-21329.mp3",
  },

  kitchen: {

    displayName: "Küche",
    isUnlocked: false,
    narrative: "Durchsuche die Küche.",
    errorNarrative: "Schaue dir vollständig die Küche an, um in andere Räume zu gelangen.",
    hasBeenEntered: false,
    canBeLeft: true,
    music: "moebius-21329.mp3",

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
        content: { title: "Inhalt", data: "Ellen mit Enkelkind." },
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
      comment: "Das solltest du besser mal überprüfen.",
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

    displayName: "Wohnzimmer",
    isUnlocked: false,
    startNarrative: "Du hast die Küche fertig durchsucht. Jetzt kannst du dir das Wohnzimmer anschauen.",
    narrative: "Durchsuche das Wohnzimmer.",
    errorNarrative: "Schaue dir erst vollständig das Wohnzimmer an, um in andere Räume zu gelangen.",
    hasBeenEntered: false,
    canBeLeft: true,
    music: "moebius-21329.mp3",

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

  bedroom: {

    displayName: "Schlafzimmer",
    isUnlocked: false,
    startNarrative: "Du bist fertig mit dem Wohnzimmer. Jetzt darfst du dir Oma Ellens Schlafzimmer anschauen.",
    narrative: "Durchsuche das Schlafzimmer.",
    errorNarrative: "Schaue dir erst vollständig das Schlafzimmer an, um in andere Räume zu gelangen.",
    hasBeenEntered: false,
    canBeLeft: true,
    music: "moebius-21329.mp3",

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

  office: {

    displayName: "Büro",
    isUnlocked: false,
    startNarrative: "Du hast dir alles wichtige im Schlafzimmer angeschaut. Nimm nun das Büro unter die Lupe.",
    narrative: "Durchsuche das Büro.",
    errorNarrative: "Schaue dir erst vollständig das Büro an, um in andere Räume zu gelangen.",
    hasBeenEntered: false,
    canBeLeft: true,
    music: "moebius-21329.mp3",

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

  garbageRoom: {

    displayName: "Entsorgungsraum",
    isUnlocked: false,
    startNarrative: "Du hast alles im Büro fertig durchsucht. Gehe nun bitte sofort in den Entsorgungsraum.",
    narrative: "Gehe in den Entsorgungsraum.",
    errorNarrative: "...",
    hasBeenEntered: false,
    canBeLeft: true,
    music: "moebius-21329.mp3",

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
