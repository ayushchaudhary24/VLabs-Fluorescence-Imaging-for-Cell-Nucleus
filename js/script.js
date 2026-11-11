/* ==========================================================
   Fluorescence Microscope — Imaging the Nucleus of Cells
   Proliferating on a Biomaterial Surface (Hoechst staining)
   Workflow: sample preparation → microscope operation → results
   ========================================================== */
(function () {
  'use strict';

  const $ = (id) => document.getElementById(id);

  /* ---------------- Step numbers (used everywhere below) ---------------- */
  const S = {
    collect: 1, dehydrate: 2, fix: 3, wash1: 4, perm: 5, wash2: 6, stain: 7,
    filter: 8, lamp: 9, intensity: 10, place: 11, focus: 12, capture: 13, result: 14
  };

  /* ---------------- Step definitions ---------------- */
  const PHASES = {
    1: 'Phase 1: Sample preparation',
    2: 'Phase 2: Fluorescence microscope operation',
    3: 'Phase 3: Results'
  };
  const PHASES_HI = {
    1: 'चरण 1: नमूना तैयार करना',
    2: 'चरण 2: फ्लोरेसेंस माइक्रोस्कोप का संचालन',
    3: 'चरण 3: परिणाम'
  };

  const STEPS = [
    { n: 1, phase: 1, title: 'Collect the specimen', btn: 'COLLECT SPECIMEN', hint: 'Collect the specimen',
      desc: 'Take the cleaned and sterilized biomaterial specimen, on which cells have been cultured for the desired period, and place it in the working area.',
      hi: { title: 'नमूना एकत्र करें', btn: 'नमूना रखें', hint: 'नमूना एकत्र करें',
            desc: 'साफ़ और जीवाणुरहित (sterilized) बायोमटेरियल नमूना लें, जिस पर वांछित अवधि तक कोशिका संवर्धन किया गया है, और उसे कार्य क्षेत्र में रखें।' } },
    { n: 2, phase: 1, title: 'Dehydration', btn: 'REMOVE CULTURE MEDIUM', hint: 'Dehydrate the specimen',
      desc: 'Remove the culture medium to dehydrate the specimen and stop the motion of the cells.',
      hi: { title: 'निर्जलीकरण', btn: 'कल्चर माध्यम हटाएँ', hint: 'नमूने को निर्जलित करें',
            desc: 'कोशिकाओं की गति रोकने के लिए नमूने से कल्चर माध्यम हटाकर उसे निर्जलित करें।' } },
    { n: 3, phase: 1, title: 'Fixation', btn: 'ADD GLUTARALDEHYDE', hint: 'Add fixative',
      desc: 'Fix the specimen with glutaraldehyde to preserve the cell structure.',
      hi: { title: 'स्थिरीकरण', btn: 'ग्लूटारएल्डिहाइड डालें', hint: 'स्थिरीकारक डालें',
            desc: 'कोशिकाओं की संरचना सुरक्षित रखने के लिए नमूने को ग्लूटारएल्डिहाइड से स्थिर (fix) करें।' } },
    { n: 4, phase: 1, title: 'Wash in PBS', btn: 'WASH WITH PBS', hint: 'Wash with PBS',
      desc: 'Wash the specimen in phosphate-buffered saline (PBS) to remove excess fixative.',
      hi: { title: 'PBS में धुलाई', btn: 'PBS से धोएँ', hint: 'PBS से धोएँ',
            desc: 'अतिरिक्त स्थिरीकारक हटाने के लिए नमूने को फॉस्फेट-बफर्ड सलाइन (PBS) में धोएँ।' } },
    { n: 5, phase: 1, title: 'Triton treatment', btn: 'ADD TRITON X-100', hint: 'Permeabilize cells',
      desc: 'Treat the specimen with Triton X-100 so the dye can pass through the cell and nuclear membranes.',
      hi: { title: 'Triton से उपचार', btn: 'TRITON X-100 डालें', hint: 'कोशिकाओं को पारगम्य बनाएँ',
            desc: 'डाई को कोशिका और केंद्रक की झिल्लियों से गुजरने देने के लिए नमूने को Triton X-100 से उपचारित करें।' } },
    { n: 6, phase: 1, title: 'Second PBS wash', btn: 'WASH WITH PBS', hint: 'Wash again with PBS',
      desc: 'Wash again in PBS to remove excess Triton X-100.',
      hi: { title: 'दूसरी PBS धुलाई', btn: 'PBS से फिर धोएँ', hint: 'PBS से दोबारा धोएँ',
            desc: 'अतिरिक्त Triton X-100 हटाने के लिए नमूने को फिर से PBS में धोएँ।' } },
    { n: 7, phase: 1, title: 'Hoechst staining', btn: 'ADD HOECHST (DARK)', hint: 'Stain in the dark',
      desc: 'Treat the specimen with Hoechst dye, which binds to the DNA and makes the nucleus fluoresce blue. The specimen is covered to protect it from light.',
      hi: { title: 'Hoechst डाई से रंगाई', btn: 'HOECHST डालें (अँधेरे में)', hint: 'अँधेरे में रंगाई करें',
            desc: 'नमूने को Hoechst डाई से उपचारित करें, जो DNA से जुड़कर केंद्रक को नीला चमकाती है। रंगाई के दौरान नमूने को प्रकाश से बचाने के लिए ढक दें।' } },
    { n: 8, phase: 2, title: 'Place the filter', btn: 'INSERT DAPI FILTER', hint: 'Insert the filter',
      desc: 'Place the DAPI filter tube, which suits the Hoechst dye, in the optical axis of the microscope.',
      hi: { title: 'फ़िल्टर लगाएँ', btn: 'DAPI फ़िल्टर लगाएँ', hint: 'फ़िल्टर लगाएँ',
            desc: 'Hoechst डाई के लिए उपयुक्त DAPI फ़िल्टर ट्यूब को माइक्रोस्कोप के प्रकाशीय अक्ष (optical axis) में लगाएँ।' } },
    { n: 9, phase: 2, title: 'Switch on the mercury vapor lamp', btn: 'SWITCH ON Hg LAMP', hint: 'Turn the lamp on',
      desc: 'Turn on the mercury vapor lamp and allow it to stabilize before use.',
      hi: { title: 'पारा-वाष्प लैम्प चालू करें', btn: 'Hg लैम्प चालू करें', hint: 'लैम्प चालू करें',
            desc: 'पारा-वाष्प लैम्प चालू करें और उपयोग से पहले उसे स्थिर होने दें।' } },
    { n: 10, phase: 2, title: 'Adjust the excitation intensity', btn: 'SET INTENSITY', hint: 'Set the light intensity',
      desc: 'Use the slider to set the excitation light to a moderate intensity (about 35–75%) so the dye is not photobleached.',
      hi: { title: 'उत्तेजन प्रकाश की तीव्रता समायोजित करें', btn: 'तीव्रता सेट करें', hint: 'प्रकाश की तीव्रता सेट करें',
            desc: 'स्लाइडर से उत्तेजन (excitation) प्रकाश की तीव्रता को मध्यम स्तर (लगभग 35–75%) पर रखें, ताकि डाई photobleach न हो।' },
      controls:
        '<div class="ctl"><label for="intSlider"><span data-i18n="illuminationIntensity">Excitation intensity</span><b id="intVal">15%</b></label>' +
        '<input type="range" id="intSlider" min="0" max="100" step="1"></div>' },
    { n: 11, phase: 2, title: 'Place the specimen', btn: 'PLACE ON STAGE', hint: 'Move specimen to stage',
      desc: 'Keep the stained specimen on the stage of the fluorescence microscope.',
      hi: { title: 'नमूना माइक्रोस्कोप पर रखें', btn: 'स्टेज पर रखें', hint: 'नमूने को स्टेज पर रखें',
            desc: 'रंगे हुए नमूने को फ्लोरेसेंस माइक्रोस्कोप के स्टेज पर रखें।' } },
    { n: 12, phase: 2, title: 'Focus on the nuclei', btn: 'CONFIRM FOCUS', hint: 'Adjust the focus',
      desc: 'With the UV shield in place, look through the eyepiece and turn the focus knob until the nuclei look sharp.',
      hi: { title: 'केंद्रक पर फोकस करें', btn: 'फोकस की पुष्टि करें', hint: 'फोकस समायोजित करें',
            desc: 'UV शील्ड लगाकर आइपीस से देखें और फोकस नॉब घुमाएँ जब तक केंद्रक स्पष्ट न दिखें।' },
      controls:
        '<div class="ctl"><label for="focSlider"><span data-i18n="focusKnob">Focus knob</span><b id="focVal">15</b></label>' +
        '<input type="range" id="focSlider" min="0" max="100" step="1"></div>' +
        '<div class="meter"><div class="meter-row"><span data-i18n="imageSharpness">Image sharpness</span><span id="sharpVal">0%</span></div>' +
        '<div class="bar"><i id="sharpBar"></i></div></div>' },
    { n: 13, phase: 2, title: 'Capture the image', btn: 'CAPTURE IMAGE', hint: 'Capture the image',
      desc: 'Capture the blue fluorescence image of the Hoechst-stained nuclei with the digital camera.',
      hi: { title: 'चित्र कैप्चर करें', btn: 'चित्र कैप्चर करें', hint: 'चित्र कैप्चर करें',
            desc: 'डिजिटल कैमरे से Hoechst से रंगे केंद्रकों का नीला फ्लोरेसेंस चित्र कैप्चर करें।' } },
    { n: 14, phase: 3, title: 'Observe the final result', btn: 'SHOW RESULT', hint: 'View the results',
      desc: 'Display the blue channel (nucleus) and the merged image (cytoskeleton + nucleus).',
      hi: { title: 'अंतिम परिणाम देखें', btn: 'परिणाम दिखाएँ', hint: 'परिणाम देखें',
            desc: 'नीला चैनल (केंद्रक) और संयुक्त चित्र (साइटोस्केलेटन + केंद्रक) देखें।' } }
  ];
  const TOTAL = STEPS.length;

  /* ---------------- Language and audio settings ---------------- */
  let currentLanguage = 'en';
  let audioMode = 'off';
  let lastSpokenStep = null;
  let hindiAudioPlayer = null;

  const UI_TEXT = {
    hi: {
      experimentTitle: 'फ्लोरेसेंस माइक्रोस्कोप : बायोमटेरियल सतह पर बढ़ती कोशिकाओं के केंद्रक की इमेजिंग',
      languageLabel: 'भाषा', audioLabel: 'ऑडियो',
      procedureControls: 'प्रक्रिया और नियंत्रण', currentStepLabel: 'वर्तमान चरण:',
      experimentProgress: 'प्रयोग की प्रगति', undo: 'पूर्ववत करें', redo: 'फिर से करें',
      resetExperiment: 'प्रयोग रीसेट करें', virtualLabBench: 'वर्चुअल लैब बेंच और फ्लोरेसेंस माइक्रोस्कोप',
      virtualLabScene: 'आभासी प्रयोगशाला दृश्य', fluorescenceRoom: 'फ्लोरेसेंस कक्ष',
      uvWarning: 'UV प्रकाश · दस्ताने और सुरक्षा चश्मा पहनें', cultureStorage: 'कल्चर भंडारण',
      preparedSpecimen: 'पहले से तैयार नमूना', noSignal: 'कोई संकेत नहीं', liveView: 'लाइव दृश्य · CCD',
      imagingSoftware: 'इमेजिंग सॉफ़्टवेयर', workingArea: 'कार्य क्षेत्र', reagentRack: 'अभिकर्मक रैक',
      fluorescenceMicroscope: 'फ्लोरेसेंस माइक्रोस्कोप', ccdCamera: 'CCD कैमरा', filterTurret: 'फ़िल्टर टर्रेट',
      hoechst: 'Hoechst', glutaraldehyde: 'ग्लूटारएल्डिहाइड', dnaBlue: 'DNA · नीला', hgLamp: 'Hg 100W', hgPower: 'Hg पावर सप्लाई',
      uvShield: 'UV शील्ड',
      focus: 'फोकस', darkIncubation: 'अँधेरे में इन्क्यूबेशन', waste: 'अपशिष्ट', ready: 'तैयार',
      outputObservations: 'आउटपुट और अवलोकन', resultsTitle: 'परिणाम', channel: 'चैनल',
      structure: 'संरचना', observation: 'अवलोकन', resultImagesTitle: 'परिणाम चित्र',
      imagePlaceholder: 'प्रयोग पूरा होने पर फ्लोरेसेंस चित्र यहाँ दिखाई देंगे।',
      showResult: 'परिणाम दिखाएँ', precautionsTitle: 'सावधानियाँ',
      precaution1: 'फ्लोरेसेंस प्रयोग के दौरान कमरे की लाइट बंद या मंद रखें।',
      precaution2: 'फ्लोरोफोर-उपचारित नमूने को excitation प्रकाश में कम से कम रखें, ताकि photobleaching और फ्लोरेसेंस संकेत की कमी से बचा जा सके।',
      precaution3: 'आइपीस से देखते समय हमेशा उचित UV-सुरक्षात्मक शील्ड का उपयोग करें। excitation किरण को सीधे न देखें।',
      illuminationIntensity: 'उत्तेजन प्रकाश की तीव्रता', focusKnob: 'फोकस नॉब', imageSharpness: 'चित्र की स्पष्टता',
      experimentComplete: 'प्रयोग पूरा हुआ', reviewResults: 'दाईं ओर फ्लोरेसेंस चित्र और अवलोकन देखें। किसी चरण पर लौटने के लिए UNDO या दोबारा शुरू करने के लिए RESET चुनें।',
      stepsCompleted: 'चरण पूरे हुए',
      resultNotReady: 'तालिका भरने के लिए प्रयोग पूरा करें।',
      blue: 'नीला', merged: 'संयुक्त',
      nucleusStructure: 'केंद्रक (DNA)',
      blueObservation: 'हर कोशिका में एक चमकीला नीला, गोल से अंडाकार केंद्रक। डाई केवल DNA से जुड़ती है, इसलिए अन्य अंगक दिखाई नहीं देते। कई केंद्रक पूरी सतह पर फैले हैं, जो बायोमटेरियल पर कोशिकाओं के प्रसार को दर्शाते हैं।',
      blueCaption: 'केंद्रक (Hoechst डाई, DAPI फ़िल्टर)',
      mergedCaption: 'साइटोस्केलेटन (हरा) + केंद्रक (नीला)',
      specStorage: 'भंडारण में', specWork: 'कार्य क्षेत्र', specStage: 'माइक्रोस्कोप स्टेज',
      condLive: 'जीवित कोशिकाएँ (कल्चर माध्यम में)', condDehydrated: 'निर्जलित', condStained: 'रंगा हुआ (DNA)',
      condFixedPermeabilized: 'स्थिर और पारगम्य', condFixed: 'स्थिर',
      phase1: 'चरण 1 · नमूना तैयार करना', phase2: 'चरण 2 · माइक्रोस्कोप संचालन', phase3: 'चरण 3 · परिणाम',
      next: 'अगला चरण', highlightButton: 'बाईं ओर हाइलाइट किए गए बटन का उपयोग करें',
      experimentCompleteCaption: 'प्रयोग पूरा हुआ — परिणाम दाईं ओर दिखाए गए हैं',
      correctFilter: '✓ DAPI फ़िल्टर ट्यूब लगा दी गई है। यह लगभग 360 nm पर excitation करती है और लगभग 460 nm पर नीला emission एकत्र करती है, जो Hoechst डाई के अनुकूल है।',
      correctIntensity: '✓ उत्तेजन प्रकाश की तीव्रता मध्यम स्तर पर सेट है।',
      correctFocus: '✓ फोकस सेट है। केंद्रक स्पष्ट दिखाई दे रहे हैं।',
      errorDim: '✗ प्रकाश की तीव्रता बहुत कम है। इसे बढ़ाएँ (लगभग 35–75% रखें)।',
      errorBright: '✗ प्रकाश की तीव्रता बहुत अधिक है और डाई photobleach हो सकती है। इसे कम करें (लगभग 35–75% रखें)।',
      errorFocus: '✗ केंद्रक अभी धुँधले हैं। फोकस नॉब घुमाते रहें जब तक स्पष्टता कम से कम 87% न हो जाए।',
      audioUnsupported: 'इस ब्राउज़र में स्पीच ऑडियो उपलब्ध नहीं है। कृपया Chrome या Edge जैसे समर्थित ब्राउज़र का उपयोग करें।'
    }
  };

  // Spoken English instruction for each step (follows the procedure wording).
  const STEP_NARRATION = [
    '',
    'Clean and sterilize the specimen, and perform the cell culture on it for the desired period. Then place the specimen in the working area.',
    'Dehydrate the specimen to stop the motion of the cells.',
    'Fix the specimen using glutaraldehyde.',
    'Wash in PBS.',
    'Treat the specimen with Triton.',
    'Again wash in PBS.',
    'Treat the specimen with the Hoechst dye.',
    'Place the suitable filter in the optical axis.',
    'Turn on the mercury vapor lamp.',
    'Adjust the intensity of the excitation light.',
    'Keep the specimen under the fluorescence microscope.',
    'Focus the desired region using eyepiece to view the nucleus of the specimen.',
    'Capture the digital images using digital camera for the Hoechst dye.',
    'Observe the final result. Click show result.'
  ];

  function tx(key, fallback) {
    if (currentLanguage === 'hi' && UI_TEXT.hi[key] !== undefined) return UI_TEXT.hi[key];
    return fallback !== undefined ? fallback : key;
  }
  const isHi = () => currentLanguage === 'hi';

  function applyStaticTranslations() {
    document.documentElement.lang = currentLanguage;
    document.querySelectorAll('[data-i18n]').forEach((el) => {
      const key = el.getAttribute('data-i18n');
      if (!el.hasAttribute('data-original-text')) el.setAttribute('data-original-text', el.textContent);
      el.textContent = isHi() && UI_TEXT.hi[key] !== undefined
        ? UI_TEXT.hi[key]
        : el.getAttribute('data-original-text');
    });
    document.querySelectorAll('[data-i18n-aria-label]').forEach((el) => {
      const key = el.getAttribute('data-i18n-aria-label');
      if (!el.hasAttribute('data-original-aria-label')) el.setAttribute('data-original-aria-label', el.getAttribute('aria-label') || '');
      el.setAttribute('aria-label', isHi() && UI_TEXT.hi[key] !== undefined
        ? UI_TEXT.hi[key] : el.getAttribute('data-original-aria-label'));
    });
  }

  function stepText(step, field) {
    return isHi() && step.hi && step.hi[field] ? step.hi[field] : step[field];
  }

  function localizeRuntimeText(text) {
    if (!isHi() || !text) return text;
    const exact = {
      'Collecting the cultured specimen from storage…': 'भंडारण से संवर्धित नमूना लिया जा रहा है…',
      'Specimen placed in the working area.': 'नमूना कार्य क्षेत्र में रख दिया गया है।',
      'Letting the specimen dry briefly…': 'नमूने को थोड़ी देर सूखने दिया जा रहा है…',
      'Fixing cells with glutaraldehyde (15 min, simulated)…': 'ग्लूटारएल्डिहाइड से कोशिकाओं का स्थिरीकरण किया जा रहा है (15 मिनट, सिम्युलेटेड)…',
      'Permeabilizing cell and nuclear membranes (10 min, simulated)…': 'कोशिका और केंद्रक झिल्लियों को पारगम्य बनाया जा रहा है (10 मिनट, सिम्युलेटेड)…',
      'Covering the specimen to protect it from light…': 'नमूने को प्रकाश से बचाने के लिए ढका जा रहा है…',
      'Switching on the mercury vapor lamp…': 'पारा-वाष्प लैम्प चालू किया जा रहा है…',
      'Removing the light-protective cover…': 'प्रकाश-सुरक्षात्मक आवरण हटाया जा रहा है…',
      'Transferring the stained specimen to the microscope stage…': 'रंगे हुए नमूने को माइक्रोस्कोप स्टेज पर ले जाया जा रहा है…',
      'Specimen in place. Blue fluorescence is reaching the camera.': 'नमूना सही जगह पर है। नीला फ्लोरेसेंस कैमरे तक पहुँच रहा है।',
      'Capturing the blue fluorescence image…': 'नीले फ्लोरेसेंस चित्र को कैप्चर किया जा रहा है…',
      'Image saved as IMG_0001.tif': 'चित्र IMG_0001.tif के रूप में सहेजा गया।',
      'Preparing the results…': 'परिणाम तैयार किए जा रहे हैं…',
      'Discarding the solution into the waste beaker…': 'घोल को अपशिष्ट बीकर में डाला जा रहा है…',
      'Gently rocking the dish to wash the specimen…': 'नमूने को धोने के लिए डिश को धीरे-धीरे हिलाया जा रहा है…',
      'Inserting the DAPI filter tube into the optical axis…': 'DAPI फ़िल्टर ट्यूब को प्रकाशीय अक्ष में लगाया जा रहा है…'
    };
    if (exact[text]) return exact[text];
    const names = {
      '2.5% glutaraldehyde': '2.5% ग्लूटारएल्डिहाइड', 'PBS': 'PBS', '0.1% Triton X-100': '0.1% Triton X-100',
      'Hoechst dye': 'Hoechst डाई', 'culture medium': 'कल्चर माध्यम', 'excess glutaraldehyde': 'अतिरिक्त ग्लूटारएल्डिहाइड',
      'Triton X-100': 'Triton X-100'
    };
    const nm = (x) => names[x] || x;
    let m;
    if ((m = text.match(/^Opening the (.+) tube…$/))) return `${nm(m[1])} ट्यूब खोली जा रही है…`;
    if ((m = text.match(/^Pouring (.+) onto the specimen…$/))) return `${nm(m[1])} नमूने पर डाला जा रहा है…`;
    if ((m = text.match(/^Returning the (.+) tube to the rack…$/))) return `${nm(m[1])} ट्यूब को रैक में वापस रखा जा रहा है…`;
    if ((m = text.match(/^Aspirating (.+) from the specimen…$/))) return `नमूने से ${nm(m[1])} हटाया जा रहा है…`;
    if ((m = text.match(/^Staining DNA in the dark… (\d+) \/ 15 min \(simulated\)$/))) return `अँधेरे में DNA की रंगाई… ${m[1]} / 15 मिनट (सिम्युलेटेड)`;
    if ((m = text.match(/^Lamp warming up and stabilizing… (\d+)% .*$/))) return `लैम्प गर्म होकर स्थिर हो रहा है… ${m[1]}% (≈15 मिनट, सिम्युलेटेड)`;
    return text;
  }

  /* ---------------- Audio narration ---------------- */
  function stopHindiAudio() {
    if (!hindiAudioPlayer) return;
    hindiAudioPlayer.pause();
    hindiAudioPlayer.currentTime = 0;
  }

  function speakWithBrowser(text, lang) {
    if (!window.speechSynthesis || !window.SpeechSynthesisUtterance || !text) return false;
    const u = new SpeechSynthesisUtterance(text);
    u.lang = lang;
    u.rate = 0.96;
    const prefix = lang.slice(0, 2);
    const voice = window.speechSynthesis.getVoices().find((v) => v.lang.toLowerCase().startsWith(prefix));
    if (voice) u.voice = voice;
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(u);
    return true;
  }

  // Hindi narration plays audio/stepNN_hi.mp3 when that recording exists;
  // otherwise it falls back to the browser's Hindi voice reading the step text.
  function speakHindi(stepNumber) {
    const fallback = () => {
      const ok = speakWithBrowser(STEPS[stepNumber - 1].hi.desc, 'hi-IN');
      if (!ok) showAlert(UI_TEXT.hi.audioUnsupported);
    };
    if (window.speechSynthesis) window.speechSynthesis.cancel();
    stopHindiAudio();
    hindiAudioPlayer.onerror = fallback;
    hindiAudioPlayer.src = `audio/step${String(stepNumber).padStart(2, '0')}_hi.mp3`;
    hindiAudioPlayer.load();
    const playback = hindiAudioPlayer.play();
    if (playback && typeof playback.catch === 'function') {
      playback.catch((e) => { if (!e || e.name !== 'AbortError') fallback(); });
    }
  }

  function speakStep(stepNumber, force) {
    if (audioMode === 'off' || stepNumber < 1 || stepNumber > TOTAL) return;
    if (!force && lastSpokenStep === stepNumber) return;
    lastSpokenStep = stepNumber;
    if (audioMode === 'hi') { speakHindi(stepNumber); return; }
    stopHindiAudio();
    speakWithBrowser(STEP_NARRATION[stepNumber], 'en-US');
  }

  function announceCurrentStep(force) {
    speakStep(Math.min(state.done + 1, TOTAL), !!force);
  }

  /* ---------------- Reagents, filter and geometry ---------------- */
  // The DAPI filter set is preselected because it matches Hoechst (Ex ≈ 350 nm, Em ≈ 461 nm).
  const FILTER = { key: 'dapi', name: 'DAPI', ex: 'Ex 360/40 nm', dm: 'DM 400', em: 'Em 460/50 nm', color: '#6366f1' };

  const POS = {
    shelf: { x: 470, y: 200, s: 1 },
    work:  { x: 450, y: 474, s: 1 },
    stage: { x: 790, y: 334, s: 0.8 }
  };
  const TUBE_Y = 325;
  const TUBES = {
    ga:  { el: 'tubeGA',  x: 80,  color: '#e9d26a', name: '2.5% glutaraldehyde' },
    pbs: { el: 'tubePBS', x: 155, color: '#bfe6ff', name: 'PBS' },
    tx:  { el: 'tubeTX',  x: 230, color: '#d8c4f3', name: '0.1% Triton X-100' },
    hs:  { el: 'tubeHS',  x: 305, color: '#7aa2ff', name: 'Hoechst dye' }
  };
  const MEDIUM_COLOR = '#f2a5b5';     // pink culture medium
  const POUR = { x: 430, y: 335, angle: 120, surface: 462 };
  const PIPETTE_REST = { x: 596, y: 466, r: -10 };
  const ASPIRATE_STEPS = [S.dehydrate, S.wash1, S.perm, S.wash2, S.stain];

  /* ---------------- State & history ---------------- */
  const initState = () => ({
    done: 0,
    intensity: 15,
    focus: 15,
    focusTarget: 55 + Math.round(Math.random() * 20),
    captured: false
  });

  let state = initState();
  let undoStack = [];
  let redoStack = [];
  let busy = false;
  let busyText = '';

  const snapshot = (s) => JSON.parse(JSON.stringify(s));

  /* ---------------- Animation helpers ---------------- */
  const ease = (t) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2);
  const lerp = (a, b, t) => a + (b - a) * t;
  const wait = (ms) => new Promise((r) => setTimeout(r, ms));

  function tween(ms, fn, e) {
    const f = e || ease;
    return new Promise((resolve) => {
      const t0 = performance.now();
      function frame(now) {
        const t = Math.min(1, (now - t0) / ms);
        fn(f(t));
        if (t < 1) requestAnimationFrame(frame); else resolve();
      }
      requestAnimationFrame(frame);
    });
  }

  function place(el, x, y, r, s) {
    el.setAttribute('transform', `translate(${x},${y}) rotate(${r || 0}) scale(${s == null ? 1 : s})`);
  }

  function hexToRgb(h) {
    const v = parseInt(h.slice(1), 16);
    return [(v >> 16) & 255, (v >> 8) & 255, v & 255];
  }
  function mixColor(a, b, t) {
    const A = hexToRgb(a), B = hexToRgb(b);
    return `rgb(${Math.round(lerp(A[0], B[0], t))},${Math.round(lerp(A[1], B[1], t))},${Math.round(lerp(A[2], B[2], t))})`;
  }

  /* ---------------- Derived values ---------------- */
  function dishLiquidFor(done) {
    if (done >= S.stain) return { color: TUBES.hs.color, op: 0.6 };
    if (done === S.wash2) return { color: TUBES.pbs.color, op: 0.55 };
    if (done === S.perm) return { color: TUBES.tx.color, op: 0.6 };
    if (done === S.wash1) return { color: TUBES.pbs.color, op: 0.55 };
    if (done === S.fix) return { color: TUBES.ga.color, op: 0.65 };
    if (done === S.dehydrate) return { color: MEDIUM_COLOR, op: 0 };
    return { color: MEDIUM_COLOR, op: 0.6 };
  }
  function tubeLevels(done) {
    return {
      ga: done >= S.fix ? 0.55 : 0.85,
      pbs: 0.9 - (done >= S.wash1 ? 0.2 : 0) - (done >= S.wash2 ? 0.2 : 0),
      tx: done >= S.perm ? 0.5 : 0.8,
      hs: done >= S.stain ? 0.35 : 0.7
    };
  }
  const wasteCount = (done) => ASPIRATE_STEPS.filter((n) => n <= done).length;
  const sharpness = (s) => Math.max(0, Math.round(100 - Math.abs(s.focus - s.focusTarget) * 3.2));

  function dishLocation(done) {
    if (done >= S.place) return 'stage';
    if (done >= S.collect) return 'work';
    return 'shelf';
  }

  /* ---------------- Static scene rendering ---------------- */
  function setTubeLevel(key, level, tiltT) {
    const liq = $(TUBES[key].el).querySelector('.liq');
    const h = level * 125;
    liq.setAttribute('height', h);
    liq.setAttribute('y', lerp(130 - h, 0, tiltT || 0));
  }

  function setDishLiquid(color, op) {
    const l = $('dishLiquid');
    l.setAttribute('fill', color);
    l.setAttribute('opacity', op);
  }

  function setWaste(count) {
    const h = 8 + count * 9;
    const w = $('wasteLiquid');
    w.setAttribute('height', h);
    w.setAttribute('y', 470 - h);
  }

  function renderMonitor() {
    const d = state.done;
    const img = $('liveImg'), msg = $('screenMsg'), tag = $('screenTag');
    if (d >= S.place) {
      const blur = Math.min(14, Math.abs(state.focus - state.focusTarget) * 0.35);
      const slope = Math.min(2.4, Math.pow(state.intensity / 55, 1.25));
      $('fxBlur').setAttribute('stdDeviation', blur.toFixed(2));
      ['fxR', 'fxG', 'fxB'].forEach((id) => $(id).setAttribute('slope', slope.toFixed(3)));
      img.setAttribute('opacity', 1);
      msg.textContent = '';
      if (d >= S.capture) { tag.textContent = isHi() ? 'कैप्चर ✓' : 'CAPTURED ✓'; tag.setAttribute('fill', '#93c5fd'); }
      else if (state.intensity > 75) { tag.textContent = isHi() ? 'अत्यधिक रोशनी' : 'OVEREXPOSED'; tag.setAttribute('fill', '#f87171'); }
      else if (state.intensity < 35) { tag.textContent = isHi() ? 'बहुत कम रोशनी' : 'TOO DIM'; tag.setAttribute('fill', '#fbbf24'); }
      else { tag.textContent = (isHi() ? '● लाइव  ' : '● LIVE  ') + sharpness(state) + '%'; tag.setAttribute('fill', '#93c5fd'); }
    } else {
      img.setAttribute('opacity', 0);
      msg.textContent = d >= S.lamp ? (isHi() ? 'नमूना नहीं' : 'NO SPECIMEN')
        : (d >= S.filter ? (isHi() ? 'लैम्प बंद' : 'LAMP OFF') : tx('noSignal', 'NO SIGNAL'));
      tag.textContent = '';
    }
  }

  function renderScene() {
    const d = state.done;

    // dish
    const p = POS[dishLocation(d)];
    place($('dish'), p.x, p.y, 0, p.s);
    const liq = dishLiquidFor(d);
    setDishLiquid(liq.color, liq.op);
    $('scaffold').setAttribute('fill', d >= S.stain ? '#dbe6ff' : '#e8dcc4');
    $('cells').setAttribute('fill', d >= S.stain ? '#2563eb' : '#c08457');

    // tubes
    const lv = tubeLevels(d);
    Object.keys(TUBES).forEach((k) => {
      const g = $(TUBES[k].el);
      place(g, TUBES[k].x, TUBE_Y, 0, 1);
      setTubeLevel(k, lv[k], 0);
      const cap = g.querySelector('.cap');
      cap.removeAttribute('transform');
      cap.style.opacity = 1;
    });
    $('stream').setAttribute('height', 0);

    // pipette & waste
    place($('pipette'), PIPETTE_REST.x, PIPETTE_REST.y, PIPETTE_REST.r, 1);
    $('pipLiquid').setAttribute('height', 0);
    $('bulb').setAttribute('rx', 7);
    setWaste(wasteCount(d));

    // light-protective cover (after staining, until the specimen goes to the microscope)
    const cover = $('cover');
    if (d >= S.stain && d < S.place) {
      place(cover, POS.work.x, POS.work.y, 0, 1);
      cover.setAttribute('opacity', 1);
      $('coverTimer').textContent = isHi() ? 'रंगाई पूरी ✓' : 'STAINED ✓';
    } else {
      place(cover, POS.work.x, POS.work.y - 200, 0, 1);
      cover.setAttribute('opacity', 0);
    }

    // DAPI filter tube
    const fc = $('filterCube');
    $('filterBody').setAttribute('fill', FILTER.color);
    $('filterText').textContent = FILTER.name;
    fc.setAttribute('transform', d >= S.filter ? 'translate(0,0)' : 'translate(-90,0)');
    fc.setAttribute('opacity', d >= S.filter ? 1 : 0);

    // lamp (glow and excitation beam follow the intensity setting)
    const on = d >= S.lamp;
    const k = state.intensity / 100;
    $('lampGlow').setAttribute('opacity', on ? (0.25 + 0.7 * k).toFixed(2) : 0);
    $('lampWindow').setAttribute('fill', on ? '#e0f7ff' : '#111827');
    $('lampSwitch').setAttribute('y', on ? 419 : 432);
    $('lampSwitch').setAttribute('fill', on ? '#22c55e' : '#9ca3af');
    $('lampLED').setAttribute('fill', on ? '#22c55e' : '#7f1d1d');
    $('lampReadout').textContent = on ? `${state.intensity}%` : (isHi() ? 'बंद' : 'OFF');
    $('lampReadout').setAttribute('fill', on ? '#4ade80' : '#ef4444');
    $('exBeam').setAttribute('opacity', on ? (0.25 + 0.65 * k).toFixed(2) : 0);
    $('emBeam').setAttribute('opacity', on && d >= S.place ? 0.85 : 0);
    $('specGlow').setAttribute('opacity', on && d >= S.place ? 0.75 : 0);
    $('camLED').setAttribute('fill', d >= S.place ? '#22c55e' : '#4b5563');

    // focus knob & stage height
    $('knobMark').setAttribute('transform', `rotate(${state.focus * 3.6} 860 395)`);
    const dy = (state.focus - 50) * -0.08;
    $('stageGrp').setAttribute('transform', `translate(0,${dy})`);
    if (d >= S.place) place($('dish'), POS.stage.x, POS.stage.y + dy, 0, POS.stage.s);
    $('specGlow').setAttribute('cy', 324 + dy);

    renderMonitor();
    renderRing();
  }

  const RING = {
    [S.collect]: { x: 470, y: 188, r: 66 },
    [S.dehydrate]: { x: 596, y: 400, r: 44 },
    [S.fix]: { x: 80, y: 370, r: 34 },
    [S.wash1]: { x: 155, y: 370, r: 34 },
    [S.perm]: { x: 230, y: 370, r: 34 },
    [S.wash2]: { x: 155, y: 370, r: 34 },
    [S.stain]: { x: 305, y: 370, r: 34 },
    [S.filter]: { x: 735, y: 198, r: 44 },
    [S.lamp]: { x: 949, y: 440, r: 52 },
    [S.intensity]: { x: 966, y: 150, r: 46 },
    [S.place]: { x: 450, y: 440, r: 76 },
    [S.focus]: { x: 860, y: 395, r: 32 },
    [S.capture]: { x: 817, y: 63, r: 46 }
  };
  function renderRing() {
    const ring = $('focusRing');
    const t = RING[state.done + 1];
    if (!t || busy) { ring.setAttribute('opacity', 0); return; }
    ring.setAttribute('cx', t.x); ring.setAttribute('cy', t.y); ring.setAttribute('r', t.r);
    ring.setAttribute('opacity', 1);
  }

  /* ---------------- Left panel ---------------- */
  function buildStepList() {
    const list = $('stepList');
    let lastPhase = 0;
    STEPS.forEach((s) => {
      if (s.phase !== lastPhase) {
        const h = document.createElement('div');
        h.className = 'phase-title';
        h.dataset.phase = String(s.phase);
        h.textContent = isHi() ? PHASES_HI[s.phase] : PHASES[s.phase];
        list.appendChild(h);
        lastPhase = s.phase;
      }
      const div = document.createElement('div');
      div.className = 'step';
      div.id = 'step' + s.n;
      div.innerHTML =
        `<div class="step-head"><span class="num">${s.n}</span><span class="title">${stepText(s, 'title')}</span><span class="tick">✓</span></div>` +
        (s.controls ? `<div class="controls">${s.controls}</div>` : '') +
        `<div class="btn-wrap"><div class="hint">${stepText(s, 'hint')}</div>` +
        `<button class="step-btn${s.n === S.result ? ' result' : ''}" id="btn${s.n}" disabled>${stepText(s, 'btn')}</button></div>`;
      list.appendChild(div);
      $('btn' + s.n).addEventListener('click', () => runStep(s.n));
    });
  }

  let lastScrolledTo = 0;
  function renderLeft() {
    const cur = Math.min(state.done + 1, TOTAL);
    const finished = state.done >= TOTAL;
    document.querySelectorAll('.phase-title').forEach((h) => {
      const phase = Number(h.dataset.phase);
      h.textContent = isHi() ? PHASES_HI[phase] : PHASES[phase];
    });
    STEPS.forEach((s) => {
      const el = $('step' + s.n);
      const isCur = s.n === cur && !finished;
      el.classList.toggle('done', s.n <= state.done);
      el.classList.toggle('current', isCur);
      el.querySelector('.title').textContent = stepText(s, 'title');
      el.querySelector('.hint').textContent = stepText(s, 'hint');
      const btn = $('btn' + s.n);
      btn.textContent = stepText(s, 'btn');
      btn.disabled = !(isCur && !busy);
      btn.classList.toggle('busy', isCur && busy);
      el.querySelector('.hint').classList.toggle('show', isCur && !busy);
    });

    // step controls
    const iS = $('intSlider'), fS = $('focSlider');
    iS.disabled = !(cur === S.intensity && !finished && !busy);
    fS.disabled = !(cur === S.focus && !finished && !busy);
    iS.value = state.intensity; fS.value = state.focus;
    $('intVal').textContent = state.intensity + '%';
    $('focVal').textContent = state.focus;
    const sh = sharpness(state);
    $('sharpVal').textContent = sh + '%';
    $('sharpBar').style.width = sh + '%';

    // instruction box
    if (finished) {
      $('instrStep').textContent = tx('experimentComplete', 'Experiment complete');
      $('instrText').textContent = tx('reviewResults', 'Review the fluorescence images and observations on the right. Use UNDO to revisit a step or RESET to start again.');
    } else {
      const s = STEPS[cur - 1];
      $('instrStep').textContent = isHi() ? `चरण ${s.n} / ${TOTAL} — ${stepText(s, 'title')}` : `Step ${s.n} of ${TOTAL} — ${s.title}`;
      $('instrText').textContent = busy ? localizeRuntimeText(busyText) : stepText(s, 'desc');
    }

    // progress
    const pct = Math.round((state.done / TOTAL) * 100);
    $('progressBar').style.width = pct + '%';
    $('progressPct').textContent = pct + '%';
    $('progressSub').textContent = isHi() ? `${state.done} / ${TOTAL} ${tx('stepsCompleted')}` : `${state.done} of ${TOTAL} steps completed`;

    // history buttons
    $('undoBtn').disabled = busy || undoStack.length === 0;
    $('redoBtn').disabled = busy || redoStack.length === 0;
    $('resetBtn').disabled = busy;

    // keep the current step visible
    if (cur !== lastScrolledTo && !finished) {
      lastScrolledTo = cur;
      scrollToCurrent(true);
    }
    if (audioMode !== 'off') announceCurrentStep(false);
  }

  function scrollToCurrent(smooth) {
    const cur = state.done + 1;
    if (cur > TOTAL) return;
    const el = $('step' + cur);
    const body = $('leftBody');
    const top = el.getBoundingClientRect().top - body.getBoundingClientRect().top + body.scrollTop - 10;
    body.scrollTo({ top: Math.max(0, top), behavior: smooth ? 'smooth' : 'auto' });
  }

  /* ---------------- Badges and caption ---------------- */
  function renderBadges() {
    const d = state.done;
    const loc = dishLocation(d);
    let cond = isHi() ? UI_TEXT.hi.condLive : 'Live cells (in culture medium)';
    if (d >= S.stain) cond = isHi() ? UI_TEXT.hi.condStained : 'Stained (DNA)';
    else if (d >= S.perm) cond = isHi() ? UI_TEXT.hi.condFixedPermeabilized : 'Fixed & permeabilized';
    else if (d >= S.fix) cond = isHi() ? UI_TEXT.hi.condFixed : 'Fixed';
    else if (d >= S.dehydrate) cond = isHi() ? UI_TEXT.hi.condDehydrated : 'Dehydrated';
    const where = isHi()
      ? { shelf: UI_TEXT.hi.specStorage, work: UI_TEXT.hi.specWork, stage: UI_TEXT.hi.specStage }[loc]
      : { shelf: 'In storage', work: 'Working area', stage: 'Microscope stage' }[loc];
    $('specBadge').textContent = `${isHi() ? 'नमूना' : 'SPECIMEN'}: ${where}${d >= 1 ? ' · ' + cond : ''}`;

    const cur = Math.min(d + 1, TOTAL);
    const ph = STEPS[cur - 1].phase;
    $('phaseBadge').textContent = isHi()
      ? ['', UI_TEXT.hi.phase1, UI_TEXT.hi.phase2, UI_TEXT.hi.phase3][ph]
      : ['', 'PHASE 1 · SAMPLE PREPARATION', 'PHASE 2 · MICROSCOPE OPERATION', 'PHASE 3 · RESULTS'][ph];

    if (!busy) {
      $('caption').textContent = d >= TOTAL
        ? tx('experimentCompleteCaption', 'Experiment complete — results are shown on the right')
        : isHi()
          ? `${tx('next')} : ${stepText(STEPS[d], 'hint')} (${tx('highlightButton')})`
          : `Next: ${STEPS[d].hint} (use the highlighted button on the left)`;
    }
  }

  function renderResults() {
    const shown = state.done >= TOTAL;
    const rows = $('resultRows');
    const box = $('resultBox');
    if (!shown) {
      rows.innerHTML = `<tr><td colspan="3" class="muted">${tx('resultNotReady', 'Complete the experiment to populate the table.')}</td></tr>`;
      box.innerHTML = `<p class="placeholder">${isHi() ? `${UI_TEXT.hi.imagePlaceholder} <b>${UI_TEXT.hi.showResult}</b>` : 'The fluorescence images will appear after completion when you click <b>SHOW RESULT</b>.'}</p>`;
      box.dataset.shown = '';
      return;
    }
    rows.innerHTML = isHi()
      ? `<tr><td><span class="dot" style="background:#3b82f6"></span>${UI_TEXT.hi.blue}</td><td>${UI_TEXT.hi.nucleusStructure}</td><td>${UI_TEXT.hi.blueObservation}</td></tr>`
      : '<tr><td><span class="dot" style="background:#3b82f6"></span>Blue</td><td>Nucleus (DNA)</td>' +
        '<td>One bright blue, round to oval nucleus in each cell. The dye binds only to DNA, so other organelles are not visible. Many nuclei are spread over the whole surface, showing that the cells have proliferated on the biomaterial.</td></tr>';

    if (box.dataset.shown !== '1') {
      box.dataset.shown = '1';
      box.innerHTML =
        '<figure><img src="img/nucleus.png" alt=""><figcaption></figcaption></figure>' +
        '<figure><img src="img/merged_img.png" alt=""><figcaption></figcaption></figure>';
      box.querySelectorAll('img').forEach((img) => {
        img.addEventListener('click', () => {
          $('lbImg').src = img.src;
          $('lbCap').textContent = img.alt;
          $('lightbox').classList.remove('hidden');
        });
      });
    }
    const figs = box.querySelectorAll('figure');
    const caps = isHi()
      ? [['नीला चैनल: केंद्रक', `<b>नीला चैनल</b> — ${UI_TEXT.hi.blueCaption}`],
         ['संयुक्त चित्र: साइटोस्केलेटन और केंद्रक', `<b>संयुक्त चित्र</b> — ${UI_TEXT.hi.mergedCaption}`]]
      : [['Blue channel: nucleus', '<b>Blue channel</b> — nucleus (Hoechst dye, DAPI filter)'],
         ['Merged image: cytoskeleton and nucleus', '<b>Merged image</b> — cytoskeleton (green) + nucleus (blue)']];
    figs.forEach((f, i) => {
      f.querySelector('img').alt = caps[i][0];
      f.querySelector('figcaption').innerHTML = caps[i][1];
    });
  }

  function renderUI() {
    renderLeft();
    renderBadges();
    renderResults();
  }

  function renderAll() {
    applyStaticTranslations();
    renderScene();
    renderUI();
  }

  /* ---------------- Messages ---------------- */
  let alertTimer = null;
  function showAlert(msg, ok) {
    const a = $('alert');
    a.textContent = localizeRuntimeText(msg);
    a.classList.toggle('ok', !!ok);
    a.classList.remove('hidden');
    requestAnimationFrame(() => scrollToCurrent(false));
    clearTimeout(alertTimer);
    alertTimer = setTimeout(() => a.classList.add('hidden'), ok ? 3500 : 7000);
  }
  function hideAlert() { $('alert').classList.add('hidden'); }

  function setBusy(text) {
    busy = true;
    busyText = text;
    $('caption').textContent = localizeRuntimeText(text);
    $('focusRing').setAttribute('opacity', 0);
    renderUI();
  }
  function say(text) {
    busyText = text;
    $('caption').textContent = localizeRuntimeText(text);
    $('instrText').textContent = localizeRuntimeText(text);
  }

  /* ---------------- Reusable animations ---------------- */
  async function moveDish(from, to, ms, lift) {
    const dish = $('dish');
    await tween(ms, (k) => {
      const x = lerp(from.x, to.x, k);
      const y = lerp(from.y, to.y, k) - Math.sin(Math.PI * k) * lift;
      place(dish, x, y, 0, lerp(from.s, to.s, k));
    });
  }

  async function pour(key, toColor, toOp) {
    const t = TUBES[key];
    const g = $(t.el);
    const cap = g.querySelector('.cap');
    const lv = tubeLevels(state.done)[key];
    const lvAfter = tubeLevels(state.done + 1)[key];
    const sx = t.x, sy = TUBE_Y;

    say(`Opening the ${t.name} tube…`);
    await tween(350, (k) => {
      cap.setAttribute('transform', `translate(${14 * k},${-28 * k}) rotate(${35 * k})`);
      cap.style.opacity = 1 - k;
    });
    await tween(450, (k) => place(g, sx, lerp(sy, sy - 90, k)));
    await tween(800, (k) => place(g, lerp(sx, POUR.x, k), lerp(sy - 90, POUR.y, k)));
    await tween(600, (k) => { place(g, POUR.x, POUR.y, POUR.angle * k); setTubeLevel(key, lv, k); });

    say(`Pouring ${t.name} onto the specimen…`);
    const st = $('stream');
    const full = POUR.surface - POUR.y;
    st.setAttribute('fill', t.color);
    st.setAttribute('x', POUR.x - 2.5);
    st.setAttribute('y', POUR.y);
    await tween(300, (k) => st.setAttribute('height', full * k), (x) => x);

    const l = $('dishLiquid');
    const fromColor = l.getAttribute('fill');
    const fromOp = parseFloat(l.getAttribute('opacity')) || 0;
    const fromHex = fromColor.startsWith('#') ? fromColor : toColor;
    await tween(1300, (k) => {
      setDishLiquid(mixColor(fromHex, toColor, k), lerp(fromOp, toOp, k));
      setTubeLevel(key, lerp(lv, lvAfter, k), 1);
    });
    await tween(280, (k) => { st.setAttribute('y', POUR.y + full * k); st.setAttribute('height', full * (1 - k)); }, (x) => x);
    st.setAttribute('height', 0);

    say(`Returning the ${t.name} tube to the rack…`);
    await tween(500, (k) => { place(g, POUR.x, POUR.y, POUR.angle * (1 - k)); setTubeLevel(key, lvAfter, 1 - k); });
    await tween(800, (k) => place(g, lerp(POUR.x, sx, k), lerp(POUR.y, sy - 90, k)));
    await tween(400, (k) => place(g, sx, lerp(sy - 90, sy, k)));
    await tween(300, (k) => {
      cap.setAttribute('transform', `translate(${14 * (1 - k)},${-28 * (1 - k)}) rotate(${35 * (1 - k)})`);
      cap.style.opacity = k;
    });
    cap.removeAttribute('transform');
  }

  async function aspirate(what) {
    const p = $('pipette'), bulb = $('bulb'), pl = $('pipLiquid'), l = $('dishLiquid');
    const R = PIPETTE_REST;
    const col = l.getAttribute('fill');
    const op = parseFloat(l.getAttribute('opacity')) || 0;
    const tip = { x: 478, y: 466 };

    say(`Aspirating ${what} from the specimen…`);
    await tween(450, (k) => place(p, R.x, lerp(R.y, R.y - 130, k), R.r));
    await tween(700, (k) => place(p, lerp(R.x, tip.x, k), lerp(R.y - 130, tip.y - 110, k), lerp(R.r, 0, k)));
    await tween(450, (k) => place(p, tip.x, lerp(tip.y - 110, tip.y, k), 0));
    await tween(220, (k) => bulb.setAttribute('rx', 7 - 3 * k));
    pl.setAttribute('fill', col);
    await tween(900, (k) => {
      bulb.setAttribute('rx', 4 + 3 * k);
      pl.setAttribute('height', 50 * k); pl.setAttribute('y', -50 * k);
      l.setAttribute('opacity', lerp(op, 0.08, k));
    });
    await tween(450, (k) => place(p, tip.x, lerp(tip.y, tip.y - 110, k), 0));
    await tween(700, (k) => place(p, lerp(tip.x, R.x, k), lerp(tip.y - 110, R.y - 130, k), lerp(0, R.r, k)));
    await tween(350, (k) => place(p, R.x, lerp(R.y - 130, R.y - 40, k), R.r));

    say('Discarding the solution into the waste beaker…');
    const w0 = 8 + wasteCount(state.done) * 9;
    const w = $('wasteLiquid');
    await tween(700, (k) => {
      bulb.setAttribute('rx', 7 - 3 * Math.sin(Math.PI * k));
      pl.setAttribute('height', 50 * (1 - k)); pl.setAttribute('y', -50 * (1 - k));
      const h = w0 + 9 * k; w.setAttribute('height', h); w.setAttribute('y', 470 - h);
    });
    await tween(300, (k) => place(p, R.x, lerp(R.y - 40, R.y, k), R.r));
  }

  async function swirl() {
    say('Gently rocking the dish to wash the specimen…');
    const d = $('dish');
    await tween(1000, (k) => place(d, POS.work.x + Math.sin(k * Math.PI * 6) * 4, POS.work.y, Math.sin(k * Math.PI * 6) * 2, 1), (x) => x);
    place(d, POS.work.x, POS.work.y, 0, 1);
  }

  /* ---------------- Step actions ---------------- */
  const ACTIONS = {
    [S.collect]: async () => {
      say('Collecting the cultured specimen from storage…');
      await moveDish(POS.shelf, POS.work, 1700, 70);
      say('Specimen placed in the working area.');
      await wait(300);
    },
    [S.dehydrate]: async () => {
      await aspirate('culture medium');
      say('Letting the specimen dry briefly…');
      const l = $('dishLiquid');
      const op = parseFloat(l.getAttribute('opacity')) || 0;
      await tween(800, (k) => l.setAttribute('opacity', lerp(op, 0, k)));
    },
    [S.fix]: async () => {
      await pour('ga', TUBES.ga.color, 0.65);
      say('Fixing cells with glutaraldehyde (15 min, simulated)…');
      await wait(900);
    },
    [S.wash1]: async () => {
      await aspirate('excess glutaraldehyde');
      await pour('pbs', TUBES.pbs.color, 0.55);
      await swirl();
    },
    [S.perm]: async () => {
      await aspirate('PBS');
      await pour('tx', TUBES.tx.color, 0.6);
      say('Permeabilizing cell and nuclear membranes (10 min, simulated)…');
      await wait(900);
    },
    [S.wash2]: async () => {
      await aspirate('Triton X-100');
      await pour('pbs', TUBES.pbs.color, 0.55);
      await swirl();
    },
    [S.stain]: async () => {
      await aspirate('PBS');
      await pour('hs', TUBES.hs.color, 0.6);
      const sc = $('scaffold'), cells = $('cells');
      await tween(700, (k) => { sc.setAttribute('fill', mixColor('#e8dcc4', '#dbe6ff', k)); cells.setAttribute('fill', mixColor('#c08457', '#2563eb', k)); });
      say('Covering the specimen to protect it from light…');
      const cover = $('cover');
      $('coverTimer').textContent = '';
      await tween(900, (k) => { place(cover, POS.work.x, lerp(POS.work.y - 200, POS.work.y, k)); cover.setAttribute('opacity', Math.min(1, k * 2)); });
      for (let m = 0; m <= 15; m += 3) {
        $('coverTimer').textContent = `${String(m).padStart(2, '0')}:00 / 15:00`;
        say(`Staining DNA in the dark… ${m} / 15 min (simulated)`);
        await wait(450);
      }
      $('coverTimer').textContent = isHi() ? 'रंगाई पूरी ✓' : 'STAINED ✓';
    },
    [S.filter]: async () => {
      say('Inserting the DAPI filter tube into the optical axis…');
      $('filterBody').setAttribute('fill', FILTER.color);
      $('filterText').textContent = FILTER.name;
      const fc = $('filterCube');
      await tween(1000, (k) => { fc.setAttribute('transform', `translate(${lerp(-90, 0, k)},0)`); fc.setAttribute('opacity', Math.min(1, k * 1.5)); });
      await wait(300);
    },
    [S.lamp]: async () => {
      say('Switching on the mercury vapor lamp…');
      const sw = $('lampSwitch');
      await tween(250, (k) => sw.setAttribute('y', lerp(432, 419, k)));
      sw.setAttribute('fill', '#22c55e');
      const led = $('lampLED'), glow = $('lampGlow'), ro = $('lampReadout'), win = $('lampWindow');
      const target = 0.25 + 0.7 * state.intensity / 100;
      ro.setAttribute('fill', '#fbbf24');
      win.setAttribute('fill', '#e0f7ff');
      await tween(4200, (k) => {
        const flicker = k < 0.85 ? (Math.random() * 0.35) * (1 - k) : 0;
        glow.setAttribute('opacity', Math.max(0, Math.min(target, target * k * 1.3 - flicker)));
        led.setAttribute('fill', (Math.floor(k * 16) % 2 === 0) ? '#f59e0b' : '#78350f');
        const pct = Math.round(k * 100);
        ro.textContent = isHi() ? `गर्म ${pct}%` : `WARM ${pct}%`;
        if (pct % 10 === 0) say(`Lamp warming up and stabilizing… ${pct}% (≈15 min, simulated)`);
      }, (x) => x);
      led.setAttribute('fill', '#22c55e');
      ro.textContent = isHi() ? 'स्थिर' : 'STABLE';
      ro.setAttribute('fill', '#4ade80');
      const ex = $('exBeam');
      await tween(600, (k) => ex.setAttribute('opacity', (0.25 + 0.65 * state.intensity / 100) * k));
    },
    [S.place]: async () => {
      say('Removing the light-protective cover…');
      const cover = $('cover');
      await tween(700, (k) => { place(cover, POS.work.x, lerp(POS.work.y, POS.work.y - 160, k)); cover.setAttribute('opacity', 1 - k); });
      say('Transferring the stained specimen to the microscope stage…');
      const dy = (state.focus - 50) * -0.08;
      await moveDish(POS.work, { x: POS.stage.x, y: POS.stage.y + dy, s: POS.stage.s }, 2000, 150);
      say('Specimen in place. Blue fluorescence is reaching the camera.');
      const em = $('emBeam'), sg = $('specGlow');
      $('camLED').setAttribute('fill', '#22c55e');
      await tween(700, (k) => { em.setAttribute('opacity', 0.85 * k); sg.setAttribute('opacity', 0.75 * k); });
    },
    [S.capture]: async () => {
      say('Capturing the blue fluorescence image…');
      const led = $('camLED'), fl = $('screenFlash');
      led.setAttribute('fill', '#ef4444');
      await tween(500, (k) => fl.setAttribute('opacity', 1 - k));
      led.setAttribute('fill', '#22c55e');
      say('Image saved as IMG_0001.tif');
      await wait(500);
    },
    [S.result]: async () => {
      say('Preparing the results…');
      await wait(400);
    }
  };

  // Validation before a step is allowed to run (returns error text or '').
  function validate(n) {
    if (n === S.intensity) {
      if (state.intensity < 35) return tx('errorDim', '✗ The excitation light is too weak. Increase the intensity (aim for a moderate level, about 35–75%).');
      if (state.intensity > 75) return tx('errorBright', '✗ The excitation light is too strong and will photobleach the dye. Reduce the intensity (about 35–75%).');
    }
    if (n === S.focus && sharpness(state) < 87) {
      return tx('errorFocus', '✗ The nuclei are still blurred. Keep turning the focus knob until sharpness is at least 87%.');
    }
    return '';
  }

  async function runStep(n) {
    if (busy || n !== state.done + 1) return;
    const err = validate(n);
    if (err) { showAlert(err); return; }
    hideAlert();

    const before = snapshot(state);
    const step = STEPS[n - 1];
    if (ACTIONS[n]) {
      setBusy(stepText(step, 'title') + '…');
      try { await ACTIONS[n](); } catch (e) { console.error(e); }
    }

    if (n === S.capture) state.captured = true;
    state.done = n;
    undoStack.push(before);
    redoStack = [];
    busy = false;
    renderAll();

    if (n === S.filter) showAlert(tx('correctFilter', '✓ DAPI filter tube inserted. It excites at about 360 nm and collects blue emission at about 460 nm, matching the Hoechst dye.'), true);
    if (n === S.intensity) showAlert(tx('correctIntensity', '✓ The excitation intensity is set to a moderate level.'), true);
    if (n === S.focus) showAlert(tx('correctFocus', '✓ Focus is set. The nuclei are sharp.'), true);
    if (n === S.result) {
      const rp = document.querySelector('.panel.right .panel-body');
      const t = document.querySelector('.panel.right .sec-title');
      if (rp && t) rp.scrollTo({ top: t.offsetTop - rp.offsetTop - 8, behavior: 'smooth' });
    }
  }

  /* ---------------- Undo / Redo / Reset ---------------- */
  function undo() {
    if (busy || !undoStack.length) return;
    redoStack.push(snapshot(state));
    state = undoStack.pop();
    hideAlert();
    lastScrolledTo = 0;
    renderAll();
  }
  function redo() {
    if (busy || !redoStack.length) return;
    undoStack.push(snapshot(state));
    state = redoStack.pop();
    hideAlert();
    lastScrolledTo = 0;
    renderAll();
  }
  function reset() {
    if (busy) return;
    state = initState();
    lastSpokenStep = null;
    undoStack = [];
    redoStack = [];
    hideAlert();
    lastScrolledTo = 0;
    renderAll();
  }

  /* ---------------- Wire up ---------------- */
  function init() {
    hindiAudioPlayer = new Audio();
    hindiAudioPlayer.preload = 'auto';
    buildStepList();
    applyStaticTranslations();

    $('undoBtn').addEventListener('click', undo);
    $('redoBtn').addEventListener('click', redo);
    $('resetBtn').addEventListener('click', reset);

    $('languageSelect').addEventListener('change', (e) => {
      currentLanguage = e.target.value === 'hi' ? 'hi' : 'en';
      renderAll();
    });

    $('audioSelect').addEventListener('change', (e) => {
      stopHindiAudio();
      if (window.speechSynthesis) window.speechSynthesis.cancel();
      audioMode = ['en', 'hi'].includes(e.target.value) ? e.target.value : 'off';
      lastSpokenStep = null;
      if (audioMode === 'en' && (!('speechSynthesis' in window) || !('SpeechSynthesisUtterance' in window))) {
        audioMode = 'off';
        e.target.value = 'off';
        showAlert(isHi() ? UI_TEXT.hi.audioUnsupported : 'Audio narration is not supported in this browser. Please use a supported browser such as Chrome or Edge.');
      } else if (audioMode !== 'off') {
        announceCurrentStep(true);
      }
    });

    $('intSlider').addEventListener('input', () => {
      if (busy || state.done + 1 !== S.intensity) return;
      state.intensity = parseInt($('intSlider').value, 10);
      renderAll();
    });
    $('focSlider').addEventListener('input', () => {
      if (busy || state.done + 1 !== S.focus) return;
      state.focus = parseInt($('focSlider').value, 10);
      renderAll();
    });

    $('lightbox').addEventListener('click', () => $('lightbox').classList.add('hidden'));
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') $('lightbox').classList.add('hidden');
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'z') { e.preventDefault(); e.shiftKey ? redo() : undo(); }
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'y') { e.preventDefault(); redo(); }
    });

    renderAll();
  }

  document.addEventListener('DOMContentLoaded', init);
})();
