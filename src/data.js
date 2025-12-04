export const data = {

  elevator: {

    displayName: "Aufzug",
    isUnlocked: true,
    startNarrative: [
      "Wie lange ist es her, dass du das letzte Mal in diesem Aufzug warst...", 
      "Ich wünschte, deine Rückkehr hätte nicht einen so traurigen Grund.", 
      "Aber es ist schön, dass du noch einmal durch die Wohnung gehen kannst, bevor das Wohnmodul neu vermittelt wird.", 
      "Und wie immer helfe ich dir gerne dabei, Gegenstände zu identifizieren und mehr über sie zu erfahren.",
      "In diesem Aufzug gibt es zum Beispiel auch ein paar interessante Objekte zu entdecken.",
      "Lass dir Zeit und schau dich um. Und sobald du dich bereit fühlst, fahre in den 26. Stock um zu Oma Ellens Wohnung zu gelangen.",
      "Du schaffst das. Ich glaube an dich.",
    ],
    narrative: "Fahre in den 26. Stock.",
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
        belongsTo: { title: "Zugehörigkeit", data: "Ministerium für Statistik CN-B" },
        content: { title: "Inhalt", data: "Die täglichen, landesweiten Statistiken." },
      },
      comment: "Tolle Nachrichten: Der Zufriedenheitsindex ist über Nacht um 1% gestiegen.",
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
      "Vom Flur aus gelangst du in jeden Raum.",
      "Du kannst jederzeit zurückkommen, um zu den restlichen Räumen zu gelangen.",
      "Als erstes könntest du dir Ellens Küche ansehen.",
    ],
    narrative: "Durchsuche die Küche.",
    hasBeenEntered: false,
    canBeLeft: false,
    music: "moebius-21329.mp3",
  },

  kitchen: {
    displayName: "Küche",
    akkusativ: "die",
    dativ: "in die",
    isUnlocked: false,
    narrative: "Durchsuche die Küche.",
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
        belongsTo: { title: "Zugehörigkeit", data: "Privathaushalt #2690" },
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
        belongsTo: { title: "Zugehörigkeit", data: "Privathaushalt #2690"},
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
        belongsTo: { title: "Zugehörigkeit", data: "Privathaushalt #2690" },
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
        description: { title: "Beschreibung", data: "Beliebtes Wohngebiet."},
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
        belongsTo: { title: "Zugehörigkeit", data: "Ministerium für Wohnen CM" },
        description: { title: "Beschreibung", data: "Hochmodernes, robustes Kühlsystem."},
      },
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
        location: { title: "Herstellungsort", data: "CrueltyFree Basis West B-1" },
        status: { title: "Status", data: "Genießbar" },
      },
      textLocation: {
        right: 300,
        top: 1300,
      }
    },
  },



  livingRoom: {

    displayName: "Wohnzimmer",
    akkusativ: "das",
    dativ: "ins",
    isUnlocked: false,
    startNarrative: "Du hast die Küche fertig durchsucht. Jetzt kannst du dir das Wohnzimmer anschauen.",
    narrative: "Durchsuche das Wohnzimmer.",
    hasBeenEntered: false,
    canBeLeft: true,
    music: "moebius-21329.mp3",

    view3: {
      scale: 2.5,
      originX: 5464,
      originY: 1525, 
      hasBeenClicked: false,
      text: {
        name: { title: "Sichtbarer Bereich", data: "Komplex Ministerium für Harmonie" },
        year: { title: "Baujahr", data: "04" },
        belongsTo: { title: "Zugehörigkeit", data: "Cluster Mitte" },
        description: { title: "Beschreibung", data: "Ministerium für dein Wohlbefinden."},
      },
      textLocation: {
        left: 500,
        top: "center",
      }
    },

    map: {
      scale: 3,
      originX: 0,
      originY: 500, 
      hasBeenClicked: false,
      text: {
        name: { title: "Objektname", data: "Karte von Zentralstadt"},
        year: { title: "Herstellungsjahr", data: "46" },
        status: { title: "Status", data: "Aktiv"},
        belongsTo: { title: "Zugehörigkeit", data: "Wohnkomplex 3AC CM"},
      },
      comment: "Spannend, man sieht sogar, wo wir uns befinden!",
      textLocation: {
          left: "center",
          bottom: 450,
      }
    },

    tv: {
      scale: 4,
      originX: 0,
      originY: 500, 
      hasBeenClicked: false,
      text: {
        name: { title: "Objektname", data: "Television Reciever NM-X"},
        year: { title: "Herstellungsjahr", data: "43" },
        status: { title: "Status", data: "Inaktiv, Leistung eingeschränkt" },
        belongsTo: { title: "Zugehörigkeit", data: "Privathaushalt #2690" },
      },
      textLocation: {
          left: "center",
          bottom: 450,
      }
    },

    heater: {
      scale: 4,
      originX: 0,
      originY: 500, 
      hasBeenClicked: false,
      text: {
        name: { title: "Objektname", data: "HeatUp TN I" },
        year: { title: "Herstellungsjahr", data: "49" },
        status: { title: "Status", data: "Aktiv, Radiator noch zu 54% intakt" },
        belongsTo: { title: "Zugehörigkeit", data: "Wohnkomplex 3AC CM" },
      },
      textLocation: {
          left: "center",
          bottom: 450,
      }
    },

    shelf: {
      scale: 2.3,
      originX: 1000,
      originY: 1500, 
      hasBeenClicked: false,
    },

    shelfActivated: {
      scale: 2.3,
      originX: 1000,
      originY: 1500, 
    },

    book1: {
      scale: 4,
      originX: 0,
      originY: 500, 
      hasBeenClicked: false,
      text: {
        name: { title: "Objektname", data: "SmartBook 2.0" },
        bookTitle: { title: "Titel", data: "Die Lichtblicke des Lebens"},
        year: { title: "Veröffentlichungsjahr", data: "32" },
        genre: { title: "Genre", data: "Selbstoptimierung"},
        belongsTo: { title: "Zugehörigkeit", data: "Privathaushalt #2690" },
        // description: { title: "Beschreibung", data: "Lerne, auch die kleinen Dinge im Leben zu schätzen." },
      },
      textLocation: {
          left: "center",
          bottom: 450,
      }
    },

    book3: {
      scale: 4,
      originX: 0,
      originY: 500, 
      hasBeenClicked: false,
      text: {
        name: { title: "Objektname", data: "SmartBook 2.0" },
        bookTitle: { title: "Titel", data: "Urbane Ernährung"},
        year: { title: "Veröffentlichungsjahr", data: "51" },
        genre: { title: "Genre", data: "Ernährung"},
        belongsTo: { title: "Zugehörigkeit", data: "Privathaushalt #2690" },
        // description: { title: "Beschreibung", data: "Effiziente Nutrition von Anbau bis Verdauung." },
      },
      textLocation: {
          left: "center",
          bottom: 450,
      }
    },

    book2: {
      scale: 4,
      originX: 0,
      originY: 500, 
      hasBeenClicked: false,
      text: {
        name: { title: "Objektname", data: "SmartBook 1.0" },
        bookTitle: { title: "Titel", data: "Die Arbeit von morgen"},
        year: { title: "Veröffentlichungsjahr", data: "15" },
        genre: { title: "Genre", data: "Gesellschaft"},
        belongsTo: { title: "Zugehörigkeit", data: "Privathaushalt #2690" },
        // description: { title: "Beschreibung", data: "Wie wir Arbeit verringern und reformieren können." },
      },
      comment: [ 
        "Wow! Toller Fund!",
        "Dieses Buch diente noch weit vor deiner Geburt als Grundlage für die Arbeitsreduktionsreform.",
      ],
      textLocation: {
          left: "center",
          bottom: 450,
      }
    },

    book4: {
      scale: 4,
      originX: 0,
      originY: 500, 
      hasBeenClicked: false,
      text: {
        name: { title: "Objektname", data: "SmartBook 2.0" },
        bookTitle: { title: "Titel", data: "Zukunftsethik"},
        year: { title: "Veröffentlichungsjahr", data: "55" },
        genre: { title: "Genre", data: "Gesellschaft"},
        belongsTo: { title: "Zugehörigkeit", data: "Ministerium für Bildung CW-D" },
        // description: { title: "Beschreibung", data: "Die bereits 20. Ausgabe des Kult-Klassikers." },
      },
      textLocation: {
          left: "center",
          bottom: 450,
      }
    },

    book5: {
      scale: 4,
      originX: 0,
      originY: 500, 
      hasBeenClicked: false,
      text: {
        name: { title: "Objektname", data: "SmartBook 1.0" },
        bookTitle: { title: "Titel", data: "Alltag meistern mit neuer Technologie"},
        year: { title: "Veröffentlichungsjahr", data: "9" },
        genre: { title: "Genre", data: "Wissenschaft"},
        belongsTo: { title: "Zugehörigkeit", data: "Privathaushalt #2690" },
        // description: { title: "Beschreibung", data: "Wie künstliche Intelligenz unser Leben umkrempeln kann." },
      },
      comment: "Spoiler Alert: in diesem verstaubten Werk geht es auch um mich!",
      textLocation: {
          left: "center",
          bottom: 450,
      }
    },

    book6: {
      scale: 4,
      originX: 0,
      originY: 500, 
      hasBeenClicked: false,
      text: {
        name: { title: "Objektname", data: "SmartBook 2.0" },
        bookTitle: { title: "Titel", data: "Unser Gemeinwohl"},
        year: { title: "Veröffentlichungsjahr", data: "50" },
        genre: { title: "Genre", data: "Gesellschaft"},
        belongsTo: { title: "Zugehörigkeit", data: "Ministerium für Harmonie CM" },
        // description: { title: "Beschreibung", data: "Leitlinie für ein glückliches Zusammenleben." },
      },
      textLocation: {
          left: "center",
          bottom: 450,
      }
    },

    book7: {
      scale: 4,
      originX: 0,
      originY: 500, 
      hasBeenClicked: false,
      text: {
        name: { title: "Objektname", data: "SmartBook 2.0" },
        bookTitle: { title: "Titel", data: "Kollektive Verantwortung"},
        year: { title: "Veröffentlichungsjahr", data: "46" },
        genre: { title: "Genre", data: "Gesellschaft"},
        belongsTo: { title: "Zugehörigkeit", data: "Ministerium für Bildung CW-D" },
        // description: { title: "Beschreibung", data: "Ein Buch über faire Machtverteilung und deine Rolle" },
      },
      textLocation: {
          left: "center",
          bottom: 450,
      }
    },
    
    book8: {
      scale: 4,
      originX: 0,
      originY: 500, 
      hasBeenClicked: false,
      text: {
        name: { title: "Objektname", data: "Buch" },
        bookTitle: { title: "Titel", data: "Der Neuanfang"},
        year: { title: "Veröffentlichungsjahr", data: "2" },
        genre: { title: "Genre", data: "Gesellschaft"},
        belongsTo: { title: "Zugehörigkeit", data: "Verwaltung Zentralstadt" },
      },
      comment: "Davon gibt es noch Ausgaben? Ich bin begeistert.",
      textLocation: {
          left: "center",
          bottom: 450,
      }
    },

    book9: {
      scale: 4,
      originX: 0,
      originY: 500, 
      hasBeenClicked: false,
      isAltlast: true,
      text: {
        name: { title: "Objektname", data: "Buch" },
        bookTitle: { title: "Titel", data: "Animal Farm"},
        year: { title: "Veröffentlichungsjahr", data: "1945" },
        genre: { title: "Genre", data: "Unregistriert"},
        belongsTo: { title: "Zugehörigkeit", data: "Unregistriert" },
      },
      comment: [ 
        "Huch? Da muss es sich wohl um ein Versehen handeln.",
        "Vermutlich hat deine Oma das Fach lange nicht mehr geöffnet und vergessen, die Altlast zu entfernen.",
        "Aber keine Sorge, du kannst das Objekt einfach für sie entsorgen sobald du die Wohnung fertig angeschaut hast.",
      ],
      textLocation: {
          left: "center",
          bottom: 450,
      }
    },
  },

  bedroom: {

    displayName: "Schlafzimmer",
    akkusativ: "das",
    dativ: "ins",
    isUnlocked: false,
    startNarrative: "Du bist fertig mit dem Wohnzimmer. Jetzt könntest du dir Oma Ellens Schlafzimmer anschauen.",
    narrative: "Durchsuche das Schlafzimmer.",
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
        belongsTo: { title: "Zugehörigkeit", data: "Privathaushalt #2690" },
      },
      textLocation: {
          left: "center",
          bottom: 450,
      }
    },
  },

  office: {

    displayName: "Büro",
    akkusativ: "das",
    dativ: "ins",
    isUnlocked: false,
    startNarrative: "Du hast dir alles wichtige im Schlafzimmer angeschaut. Nimm nun das Büro unter die Lupe.",
    narrative: "Durchsuche das Büro.",
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
        belongsTo: { title: "Zugehörigkeit", data: "Privathaushalt #2690" },
      },
      textLocation: {
          left: "center",
          bottom: 450,
      }
    },
  },

  garbageRoom: {

    displayName: "Entsorgungsraum",
    akkusativ: "den",
    dativ: "in den", 
    isUnlocked: false,
    startNarrative: "Du hast alles im Büro fertig durchsucht. Gehe nun bitte sofort in den Entsorgungsraum.",
    narrative: "Gehe in den Entsorgungsraum.",
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
        belongsTo: { title: "Zugehörigkeit", data: "Privathaushalt #2690" },
      },
      textLocation: {
          left: "center",
          bottom: 450,
      }
    },
  },


};
