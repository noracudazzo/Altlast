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
    musicVolume: 0.025,

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
    music: "interstellar-adventure-space-theme-soundtrack-4494.mp3",
    musicVolume: 0.2,
    startNarrative: [
      "Vom Flur aus gelangst du in jeden Raum.",
      "Du kannst jederzeit zurückkommen, um zu den restlichen Räumen zu gelangen.",
      "Als erstes könntest du dir Ellens Küche ansehen.",
    ],
    narrative: "Durchsuche die Küche.",
    hasBeenEntered: false,
    canBeLeft: false,
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
    musicVolume: 0.015,

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
    music: "deep-vibes-synthwave-beat-259777.mp3",

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
      scale: 1.5,
      originX: 2732,
      originY: 2000, 
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
          bottom: 200,
      }
    },

        /*

    x = 5464
    x/2 = 2732
    y 3072
    y/2 = 1536 */

    tv: {
      scale: 2.25,
      originX: 0,
      originY: 1200, 
      hasBeenClicked: false,
      text: {
        name: { title: "Objektname", data: "Television Reciever NM-X"},
        year: { title: "Herstellungsjahr", data: "43" },
        status: { title: "Status", data: "Inaktiv, Leistung eingeschränkt" },
        belongsTo: { title: "Zugehörigkeit", data: "Privathaushalt" },
      },
      textLocation: {
          right: 1000,
          bottom: 1100,
      }
    },

    shelf: {
      scale: 4,
      originX: 1200,
      originY: 1200, 
      hasBeenClicked: false,
    },

    book1: {
      scale: 5.5,
      originX: 1000,
      originY: 500, 
      hasBeenClicked: false,
      text: {
        name: { title: "Objektname", data: "SmartBook 2.0" },
        bookTitle: { title: "Titel", data: "Die Lichtblicke des Lebens"},
        year: { title: "Veröffentlichungsjahr", data: "32" },
        genre: { title: "Genre", data: "Selbstoptimierung"},
        belongsTo: { title: "Zugehörigkeit", data: "Privathaushalt" },
        // description: { title: "Beschreibung", data: "Lerne, auch die kleinen Dinge im Leben zu schätzen." },
      },
      textLocation: {
          left: "center",
          bottom: 450,
      }
    },

    book3: {
      scale: 6,
      originX: 1500,
      originY: 1750, 
      hasBeenClicked: false,
      text: {
        name: { title: "Objektname", data: "SmartBook 2.0" },
        bookTitle: { title: "Titel", data: "Urbane Ernährung"},
        year: { title: "Veröffentlichungsjahr", data: "51" },
        genre: { title: "Genre", data: "Ernährung"},
        belongsTo: { title: "Zugehörigkeit", data: "Privathaushalt" },
        // description: { title: "Beschreibung", data: "Effiziente Nutrition von Anbau bis Verdauung." },
      },
      textLocation: {
        right: 300,
        top: 1250,
      }
    },

    book2: {
      scale: 4,
      originX: 700,
      originY: 2475,  
      hasBeenClicked: false,
      text: {
        name: { title: "Objektname", data: "SmartBook 1.0" },
        bookTitle: { title: "Titel", data: "Die Arbeit von morgen"},
        year: { title: "Veröffentlichungsjahr", data: "15" },
        genre: { title: "Genre", data: "Gesellschaft"},
        belongsTo: { title: "Zugehörigkeit", data: "Privathaushalt" },
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
      scale: 5,
      originX: 4500,
      originY: 900, 
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
          bottom: 300,
      }
    },

    book5: {
      scale: 6,
      originX: 4500,
      originY: 1300, 
      hasBeenClicked: false,
      text: {
        name: { title: "Objektname", data: "SmartBook 1.0" },
        bookTitle: { title: "Titel", data: "Alltag meistern mit neuer Technologie"},
        year: { title: "Veröffentlichungsjahr", data: "9" },
        genre: { title: "Genre", data: "Wissenschaft"},
        belongsTo: { title: "Zugehörigkeit", data: "Privathaushalt" },
        // description: { title: "Beschreibung", data: "Wie künstliche Intelligenz unser Leben umkrempeln kann." },
      },
      comment: "Spoiler Alert: in diesem verstaubten Werk geht es auch um mich!",
      textLocation: {
        right: 300,
        top: 1250,
      }
    },

    book6: {
      scale: 5.5,
      originX: 4300,
      originY: 1750, 
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
        left: 500,
        top: 1250,
      }
    },

    book7: {
      scale: 5,
      originX: 4500,
      originY: 2450, 
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
        right: 300,
        top: 1250,
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
        bookTitle: { title: "Titel", data: "Die Chaoszeit"},
        year: { title: "Veröffentlichungsjahr", data: "2042" },
        genre: { title: "Genre", data: "Unregistriert"},
        belongsTo: { title: "Zugehörigkeit", data: "Unregistriert" },
      },
      comment: [ 
        "Huch? Da muss es sich wohl um ein Versehen handeln.",
        "Vermutlich hat deine Oma das Fach lange nicht mehr geöffnet und vergessen, die Altlast zu entfernen.",
        "Aber keine Sorge, du kannst das Objekt einfach für sie entsorgen sobald du die Wohnung fertig angeschaut hast.",
      ],
      textLocation: {
        right: 300,
        top: 1250,
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
    music: "magical-technology-sci-fi-science-futuristic-game-music-300607.mp3",

    plant3: {
      scale: 4,
      originX: 900,
      originY: 2000, 
      hasBeenClicked: false,
      text: {
        name: { title: "Objektname", data: "GreenUnit Delta II" },
        year: { title: "Herstellungsjahr", data: "52" },
        status: { title: "Status", data: "Gesund" },
        belongsTo: { title: "Zugehörigkeit", data: "Privathaushalt" },
      },
      textLocation: {
          left: "center",
          top: 450,
      }
    },

    view4: {
      scale: 2.5,
      originX: 0,
      originY: 1525, 
      hasBeenClicked: false,
      text: {
        name: { title: "Sichtbarer Bereich", data: "Wohnkomplex 5D-F Mitte" },
        year: { title: "Baujahr", data: "19" },
        belongsTo: { title: "Zugehörigkeit", data: "Cluster Mitte" },
        description: { title: "Beschreibung", data: "Beliebtes Wohngebiet."},
      },
      textLocation: {
        right: 500,
        top: "center",
      }
    },

    drawers: {
      scale: 5,
      originX: 1000,
      originY: 2300, 
      hasBeenClicked: false,
    },

    plushie: {
      scale: 5,
      originX: 3150,
      originY: 2050, 
      hasBeenClicked: false,
      text: {
        name: { title: "Objektname", data: "StuffyMate 600" },
        year: { title: "Herstellungsjahr", data: "13" },
        status: { title: "Status", data: "Abgenutzt" },
        belongsTo: { title: "Zugehörigkeit", data: "Privathaushalt" },
      },
      comment: "Mit dem Fuchs hast du früher sehr oft gespielt, wenn du bei Oma Ellen zu Gast warst. Schöne Zeiten.",
      textLocation: {
        right: "center",
        top: 450,
      }
    },

    shirt: {
      scale: 4,
      originX: 4900,
      originY: 900, 
      hasBeenClicked: false,
      isAltlast: true,
      text: {
        name: { title: "Objektname", data: '"Lumen" T-Shirt' },
        year: { title: "Herstellungsjahr", data: "2041"},
        status: { title: "Status", data: "Unbekannt" },
        belongsTo: { title: "Zugehörigkeit", data: "Unregistriert" },
      },
      comment: "Das Shirt solltest du am Ende besser entsorgen.",
      textLocation: {
        left: 500,
        top: "center",
      }
    },

    suit: {
      scale: 2.5,
      originX: 5464,
      originY: 1000, 
      hasBeenClicked: false,
      isAltlast: false,
      text: {
        name: { title: "Objektname", data: "Day Flex Suit 7"},
        year: { title: "Herstellungsjahr", data: "52"},
        status: { title: "Status", data: "Leicht abgenutzt" },
        belongsTo: { title: "Zugehörigkeit", data: "Privathaushalt" },
      },
      textLocation: {
        left: 500,
        top: "center",
      }
    },

    shoes: {
      scale: 4,
      originX: 5464,
      originY: 2450, 
      hasBeenClicked: false,
      isAltlast: false,
      text: {
        name: { title: "Objektname", data: "AgileBoots RC"},
        year: { title: "Herstellungsjahr", data: "48"},
        status: { title: "Status", data: "Leicht abgenutzt" },
        belongsTo: { title: "Zugehörigkeit", data: "Privathaushalt" },
      },
      textLocation: {
        right: "center",
        top: 450,
      }
    },

    flashlight: {
      scale: 4,
      originX: 0,
      originY: 500, 
      hasBeenClicked: false,
      isAltlast: true,
      text: {
        name: { title: "Objektname", data: "Taschenlampe"},
        year: { title: "Herstellungsjahr", data: "2044"},
        status: { title: "Status", data: "Unbekannt" },
        belongsTo: { title: "Zugehörigkeit", data: "Unregistriert" },
      },
      comment: "Schon wieder... ist scheinbar an der Zeit, das alles auszumisten.",
      textLocation: {
        left: "center",
        top: 300,
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
    music: "scifi-intro-outro-352086.mp3",

    board1: {
      scale: 3.65,
      originX: 3300,
      originY: 1055, 
      hasBeenClicked: false,
    },

    board2: {
      scale: 3.65,
      originX: 1900,
      originY: 1055, 
      hasBeenClicked: false,
    },

    document: {
      scale: 5.75,
      originX: 2700,
      originY: 1350, 
      hasBeenClicked: false,
      isAltlast: true,
      text: {
        name: { title: "Objektname", data: 'Ankündigungsdokument' },
        bookTitle: { title: "Titel", data: "Übergangsordnung Berlin"},
        year: { title: "Veröffentlichungsjahr", data: "2041" },
        status: { title: "Status", data: "Unbekannt" },
        belongsTo: { title: "Zugehörigkeit", data: "Unregistriert" },
      },
      comment: [
        "Zentralstadt war nicht immer so lebenswert wie heute. Aber diese Geschichte wollten wir bewusst hinter uns lassen.",
        "Das Dokument muss umgehend entfernt werden.",
      ],
      textLocation: {
          left: "center",
          bottom: 450,
      }
    },

    wristband: {
      scale: 10,
      originX: 3150,
      originY: 1450, 
      hasBeenClicked: false,
      isAltlast: true,
      text: {
        name: { title: "Objektname", data: '"Lumen" Protestarmband' },
        year: { title: "Herstellungsjahr", data: "2041" },
        status: { title: "Status", data: "Unbekannt" },
        belongsTo: { title: "Zugehörigkeit", data: "Unregistriert" },
      },
      textLocation: {
        right: 300,
        top: 1250,
      }
    },

    id: {
      scale: 10,
      originX: 2000,
      originY: 850, 
      hasBeenClicked: false,
      isAltlast: true,
      text: {
        name: { title: "Objektname", data: "Deutsche Identifikationskarte" },
        year: { title: "Herstellungsjahr", data: "2039" },
        status: { title: "Status", data: "Unbekannt" },
        belongsTo: { title: "Zugehörigkeit", data: "Unregistriert" },
      },
      comment: "Dieses veraltete Ausweisdokument ist nicht mehr brauchbar und sollte umgehend vernichtet werden.",
      textLocation: {
          left: "center",
          bottom: 450,
      }
    },

    sticker1: {
      scale: 10,
      originX: 1700,
      originY: 750, 
      hasBeenClicked: false,
      isAltlast: true,
      text: {
        name: { title: "Objektname", data: '"Black lives are important" Sticker' },
        year: { title: "Herstellungsjahr", data: "2020" },
        status: { title: "Status", data: "Unbekannt" },
        belongsTo: { title: "Zugehörigkeit", data: "Unregistriert" },
      },
      textLocation: {
        right: 300,
        top: 1250,
      }
    },

    sticker2: {
      scale: 9,
      originX: 1625,
      originY: 1400, 
      hasBeenClicked: false,
      isAltlast: true,
      text: {
        name: { title: "Objektname", data: '"Fridays for tomorrow" Sticker' },
        year: { title: "Herstellungsjahr", data: "2021" },
        status: { title: "Status", data: "Unbekannt" },
        belongsTo: { title: "Zugehörigkeit", data: "Unregistriert" },
      },
      comment: [
        "Dieser alte Sticker thematisiert ein Problem, das wir mittlerweile sehr gut im Griff haben.",
        "Bewegungen wie diese werden daher nicht mehr benötigt und sollten in der Vergangenheit bleiben.",
      ],
      textLocation: {
          left: "center",
          bottom: 450,
      }
    },

    sticker3: {
      scale: 10,
      originX: 2050,
      originY: 1250, 
      hasBeenClicked: false,
      isAltlast: true,
      text: {
        name: { title: "Objektname", data: 'Proteststicker gegen die "Botswana Koalition"' },
        year: { title: "Herstellungsjahr", data: "2032" },
        status: { title: "Status", data: "Unbekannt" },
        belongsTo: { title: "Zugehörigkeit", data: "Unregistriert" },
      },
      comment: [
        "Die Thematik dieses Stickers ist schon lange nicht mehr relevant.",
        "Es ist besorgniserregend, wie viel Altlast deine Oma behalten hat.",
        "Das ist nicht nur gegen die Regeln. Es reißt auch alte Wunden auf, die eigentlich verheilt waren.",
      ],
      textLocation: {
          left: "center",
          top: 450,
      }
    },

    sticker4: {
      scale: 11,
      originX: 2725,
      originY: 800, 
      hasBeenClicked: false,
      isAltlast: true,
      text: {
        name: { title: "Objektname", data: 'Proteststicker gegen die "Nationale Schutzallianz"' },
        year: { title: "Herstellungsjahr", data: "2041" },
        status: { title: "Status", data: "Unbekannt" },
        belongsTo: { title: "Zugehörigkeit", data: "Unregistriert" },
      },
      textLocation: {
          left: "center",
          bottom: 450,
      }
    },

    sticker5: {
      scale: 12,
      originX: 2800,
      originY: 1050,  
      hasBeenClicked: false,
      isAltlast: true,
      text: {
        name: { title: "Objektname", data: 'Proteststicker gegen die "Nationale Schutzallianz"' },
        year: { title: "Herstellungsjahr", data: "2041" },
        status: { title: "Status", data: "Unbekannt" },
        belongsTo: { title: "Zugehörigkeit", data: "Unregistriert" },
      },
      comment: [
        "Die hier thematisierte Gruppierung gibt es schon lange nicht mehr.",
        "Du kannst die Sticker also problemlos wegwerfen."
      ],
      textLocation: {
          left: "center",
          bottom: 450,
      }
    },

    sticker6: {
      scale: 12,
      originX: 3075,
      originY: 1050,
      hasBeenClicked: false,
      isAltlast: true,
      text: {
        name: { title: "Objektname", data: '"Lumen" Sticker' },
        year: { title: "Herstellungsjahr", data: "2041" },
        status: { title: "Status", data: "Unbekannt" },
        belongsTo: { title: "Zugehörigkeit", data: "Unregistriert" },
      },
      comment: [
        "Wir haben der Gruppe viel zu verdanken. ",
        "Aber heute brauchen wir keine Rebellionen mehr, es geht uns schließlich sehr gut, oder nicht?",
        "Und wir wollen niemanden dazu inspirieren, auf dumme Gedanken zu kommen.",
        "Daher bitte ich dich darum, später alle Erinnerungsstücke an die Lumen Bewegung zu entsorgen.",
      ],
      textLocation: {
          left: "center",
          bottom: 450,
      }
    },

    protestImage: {
      scale: 8,
      originX: 3025,
      originY: 800,
      hasBeenClicked: false,
      isAltlast: true,
      text: {
        name: { title: "Objektname", data: "Fotografie eines Völkeraufstands" },
        year: { title: "Herstellungsjahr", data: "2041" },
        status: { title: "Status", data: "Unbekannt" },
        belongsTo: { title: "Zugehörigkeit", data: "Unregistriert" },
      },
      comment: [
        "Die Altlastaufnahmen stammen aus einer Zeit des Chaos.", 
        "Aber mach dir keine Sorgen, das haben wir hinter uns gelassen und das wird so nicht mehr passieren.",
        "Nie wieder.",
      ],
      textLocation: {
          left: "center",
          top: 450,
      }
    },

    voteDoc1: {
      scale: 10,
      originX: 3625,
      originY: 1300, 
      hasBeenClicked: false,
      isAltlast: true,
      text: {
        name: { title: "Objektname", data: "Stimmzettel Volksentscheid 2043" },
        year: { title: "Veröffentlichungsjahr", data: "2043" },
        status: { title: "Status", data: "Unbekannt" },
        belongsTo: { title: "Zugehörigkeit", data: "Unregistriert" },
      },
      textLocation: {
          left: "center",
          top: 450,
      }
    },

    voteDoc2: {
      scale: 10,
      originX: 3500,
      originY: 1550, 
      hasBeenClicked: false,
      isAltlast: true,
      text: {
        name: { title: "Objektname", data: "Auswertung Volksentscheid 2043" },
        year: { title: "Veröffentlichungsjahr", data: "2043" },
        status: { title: "Status", data: "Unbekannt" },
        belongsTo: { title: "Zugehörigkeit", data: "Unregistriert" },
      },
      comment: "Diese Wahlzettel sollten nicht mehr existieren. Bitte entferne sie später.",
      textLocation: {
          left: "center",
          bottom: 450,
      }
    },

    flyer: {
      scale: 8,
      originX: 3150,
      originY: 1475, 
      hasBeenClicked: false,
      isAltlast: true,
      text: {
        name: { title: "Objektname", data: "Politischer Flyer" },
        bookTitle: { title: "Titel", data: "Lasst uns nach vorne schauen!"},
        year: { title: "Veröffentlichungsjahr", data: "2043" },
        status: { title: "Status", data: "Unbekannt" },
        belongsTo: { title: "Zugehörigkeit", data: "Unregistriert" },
      },
      textLocation: {
        left: 450,
        top: 1250,
      }
    },

    poem: {
      scale: 6.5,
      originX: 3700,
      originY: 825, 
      hasBeenClicked: false,
      isAltlast: true,
      text: {
        name: { title: "Objektname", data: "Gedicht" },
        bookTitle: { title: "Titel", data: "Morgen"},
        year: { title: "Veröffentlichungsjahr", data: "2043" },
        genre: { title: "Genre", data: "Unbekannt"},
        belongsTo: { title: "Zugehörigkeit", data: "Unregistriert" },
      },
      comment: "",
      comment: [ 
        "Wer hätte gedacht, dass in Ellen eine waschechte Poetin steckte?",
        "Aber die Inhalte des Gedichts sind Altlast. Bitte entsorge den Zettel später.",
      ],
      textLocation: {
        right: 300,
        top: 1250,
      }
    },

    electricityMap: {
      scale: 7,
      originX: 2200,
      originY: 1350, 
      hasBeenClicked: false,
      isAltlast: true,
      text: {
        name: { title: "Objektname", data: "Stromausfallkarte" },
        year: { title: "Herstellungsjahr", data: "2041" },
        status: { title: "Status", data: "Unbekannt" },
        belongsTo: { title: "Zugehörigkeit", data: "Unregistriert" },
      },
      comment: [ 
        "Die Karte ist sehr sehr alt. Keine Sorge.",
        "So etwas könnte heute in Zentralstadt auf keinen Fall mehr passieren.",
        "Es ist enorm wichtig, dass du diese Altlast später entfernst.",
      ],
      textLocation: {
          left: "center",
          bottom: 450,
      }
    },

    globe: {
      scale: 5,
      originX: 550,
      originY: 2400, 
      hasBeenClicked: false,
      text: {
        name: { title: "Objektname", data: "PhotoGlobe XT" },
        year: { title: "Herstellungsjahr", data: "42" },
        status: { title: "Status", data: "Intakt" },
        belongsTo: { title: "Zugehörigkeit", data: "Privathaushalt" },
        description: { title: "Beschreibung", data: "Ellens Enkelkind im Kindesalter" },
      },
      comment: "Wenn ich mich richtig erinnere, warst du da gerade mal 2 Jahre alt.",
      textLocation: {
          left: "center",
          bottom: 450,
      }
    },

    shelf2: {
      scale: 4,
      originX: 550,
      originY: 1800, 
      hasBeenClicked: false,
    },

    batteries: {
      scale: 4,
      originX: 550,
      originY: 1800, 
      hasBeenClicked: false,
      isAltlast: true,
      text: {
        name: { title: "Objektname", data: "AA Batterien" },
        year: { title: "Herstellungsjahr", data: "2040" },
        status: { title: "Status", data: "Unbekannt" },
        belongsTo: { title: "Zugehörigkeit", data: "Unregistriert" },
      },
      textLocation: {
        right: 300,
        top: 1250, 
      }
    },

    flare: {
      scale: 4,      
      originX: 550,
      originY: 1800, 
      hasBeenClicked: false,
      isAltlast: true,
      text: {
        name: { title: "Objektname", data: "Bengalfeuer" },
        year: { title: "Herstellungsjahr", data: "2041" },
        status: { title: "Status", data: "Unbekannt" },
        belongsTo: { title: "Zugehörigkeit", data: "Unregistriert" },
      },
      textLocation: {
        right: 300,
        top: 1250, 
      }
    },

    book10: {
      scale: 5.5,
      originX: 600,
      originY: 850, 
      hasBeenClicked: false,
      text: {
        name: { title: "Objektname", data: "SmartBook 2.0" },
        bookTitle: { title: "Titel", data: "Zukunftsethik"},
        year: { title: "Veröffentlichungsjahr", data: "55" },
        genre: { title: "Genre", data: "Gesellschaft"},
        belongsTo: { title: "Zugehörigkeit", data: "Ministerium für Bildung CW-D" },
      },
      textLocation: {
        right: 300,
        top: 1250,
      }
    },

    clock: {
      scale: 5,
      originX: 4700,
      originY: 700, 
      hasBeenClicked: false,
      text: {
        name: { title: "Objektname", data: "Uhr TT" },
        year: { title: "Herstellungsjahr", data: "46" },
        status: { title: "Status", data: "Inaktiv" },
        belongsTo: { title: "Zugehörigkeit", data: "Privathaushalt" },
      },
      comment: "Die Uhr ist wohl stehen geblieben...",
      textLocation: {
        right: 300,
        top: 1250,
      }
    },

    calendar: {
      scale: 5,
      originX: 4700,
      originY: 1350, 
      hasBeenClicked: false,
      text: {
        name: { title: "Objektname", data: "Kalender TT" },
        year: { title: "Herstellungsjahr", data: "54" },
        status: { title: "Status", data: "Intakt" }, // tbd
        belongsTo: { title: "Zugehörigkeit", data: "Archivkreis7" },
      },
      comment: "Das Objekt verwendet eine falsche Zeitrechnung und sollte besser entsorgt werden.",
      textLocation: {
        right: 300,
        top: 1250,
      }
    },

    tv2: {
      scale: 2.25,
      originX: 5464,
      originY: 1200, 
      hasBeenClicked: false,
      text: {
        name: { title: "Objektname", data: "Television Reciever NM-X"},
        year: { title: "Herstellungsjahr", data: "43" },
        status: { title: "Status", data: "Inaktiv, Leistung eingeschränkt" },
        belongsTo: { title: "Zugehörigkeit", data: "Privathaushalt" },
      },
      textLocation: {
          left: 1000,
          bottom: 1100,
      }
    },
  },

  garbageRoom: {
    displayName: "Entsorgungsraum",
    akkusativ: "den",
    dativ: "in den", 
    isUnlocked: false,
    startNarrative: "Entsorge sofort all die Altlast, die du in Ellens Büro gefunden hast.",
    narrative: "Entsorge jetzt die Altlast.",
    hasBeenEntered: false,
    canBeLeft: true,
    music: "ten-a-number-397379.mp3",
    musicVolume: "0.1",
    ambiance: "485049__bolkmar__fx-cut-paper.wav",
    ambianceVolume: "0.03",

    shredder: {
      hasBeenClicked: false, 
    }
  },

  outro: {
    displayName: "Outro",
    isUnlocked: false,
    canBeLeft: true,
    music: "ten-a-number-397379.mp3",
  },

  credits: {
    displayName: "Credits",
    isUnlocked: false,
    canBeLeft: true,
    music: "ten-a-number-397379.mp3",
  },


};
