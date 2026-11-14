//------------------------------------------------------------------------Voice rec----------------------------------------------------------
// Variables globales pour l'élément de l'icône du microphone et l'objet AnalyserNode
let microphoneIcon;
let analyser;

// Fonction pour démarrer la visualisation audio
function startAudioVisualization() {
  // Récupérer l'élément de l'icône du microphone
  microphoneIcon = document.getElementById('microphoneIcon');
  
  // Créer un objet AnalyserNode pour analyser les données audio
  const audioContext = new (window.AudioContext || window.webkitAudioContext)();
  analyser = audioContext.createAnalyser();

  // Configurer l'analyser
  analyser.fftSize = 256;
  const bufferLength = analyser.frequencyBinCount;
  const dataArray = new Uint8Array(bufferLength);

  // Obtenir le flux audio du microphone
  navigator.mediaDevices.getUserMedia({ audio: true })
    .then(stream => {
      const source = audioContext.createMediaStreamSource(stream);
      source.connect(analyser);

      // Mettre à jour l'effet visuel en fonction du niveau audio
      function draw() {
        requestAnimationFrame(draw);
        analyser.getByteFrequencyData(dataArray);
        // Calculer la valeur moyenne des données de fréquence pour obtenir un niveau audio global
        const audioLevel = dataArray.reduce((acc, val) => acc + val, 0) / bufferLength / 255;
        updateMicrophoneVisuals(audioLevel);
      }
      draw();
    })
    .catch(error => {
      console.error('Erreur lors de la récupération du flux audio du microphone :', error);
    });
}

// Fonction pour arrêter la visualisation audio
function stopAudioVisualization() {
  if (analyser) {
    analyser.disconnect(); // Déconnecter l'analyser du flux audio
    resetMicrophoneVisuals(); // Réinitialiser l'effet visuel
  }
}

// Fonction pour mettre à jour l'effet visuel en fonction du niveau audio
function updateMicrophoneVisuals(audioLevel) {
  // Convertir le niveau audio en une valeur d'ombre pour l'effet de box-shadow
  const boxShadowValue = `${audioLevel * 20}px ${audioLevel * 20}px ${audioLevel * 40}px rgba(255, 0, 0, ${audioLevel})`;
  // Appliquer l'effet de box-shadow à l'icône du microphone
  microphoneIcon.style.boxShadow = boxShadowValue;
}

// Fonction pour réinitialiser l'effet visuel
function resetMicrophoneVisuals() {
  // Réinitialiser l'effet de box-shadow à sa valeur par défaut
  if (microphoneIcon) {
    microphoneIcon.style.boxShadow = 'none';
  }
}
//---------------PUR----------------
// Fonction pour initialiser la reconnaissance vocale
function initializeSpeechRecognition() {
  const microphoneIcon = document.getElementById('microphoneIcon');
  const titreElement = document.getElementById('titled');

  // Vérifiez si SpeechRecognition est pris en charge par le navigateur
  if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
    // Créez un objet SpeechRecognition
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();

    // Configurez les paramètres de reconnaissance
    recognition.continuous = true; // Permet une dictée continue
    recognition.lang = 'fr-FR'; // Langue de reconnaissance (français)

    // Événement appelé lorsque la reconnaissance de la parole est terminée
    recognition.onresult = function(event) {
      const transcript = event.results[event.results.length - 1][0].transcript;
      // Insérez le texte reconnu dans votre éditeur
      const editor = document.getElementById('editor');
      editor.innerHTML += transcript + ' '; // Ajoute le texte à l'éditeur
    };

    // Événement appelé en cas d'erreur
    recognition.onerror = function(event) {
      console.error('Une erreur est survenue lors de la reconnaissance vocale :', event.error);
      microphoneIcon.src = 'Res/close.png';
      titreElement.textContent = event.error + " error";
    };

    // Retournez l'objet de reconnaissance vocale pour permettre l'arrêt ultérieur
    return recognition;
  } else {
    // Le navigateur ne prend pas en charge l'API Web Speech
    console.error('Le navigateur ne prend pas en charge l\'API Web Speech');
    titreElement.textContent = "Non supporté";
    return null;
  }
}

// Variable pour stocker l'objet de reconnaissance vocale
let recognition;
const stopper = document.getElementById('tool-container-micro-act');
// Fonction pour démarrer la reconnaissance vocale
function startSpeechRecognition() {
  // Vérifiez si la reconnaissance n'est pas déjà en cours
  if (!recognition) {
    recognition = initializeSpeechRecognition();
    stopper.style.display = 'block';
    startAudioVisualization();
  }
  // Vérifiez si la reconnaissance est prête
  if (recognition) {
    recognition.start();
    stopper.style.display = 'block';
  }
}

// Fonction pour arrêter la reconnaissance vocale
function stopSpeechRecognition() {
  stopAudioVisualization();
  // Vérifiez si la reconnaissance est en cours
  if (recognition && recognition.abort) {
    stopper.style.display = 'none';
    recognition.abort();
    recognition = null; // Réinitialisez l'objet de reconnaissance vocale
  }
}
