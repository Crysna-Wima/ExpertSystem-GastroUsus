$(document).ready(function() {
    // Define symptoms and their associated diseases
    var symptoms = {
    'Mencret': ['buangAirBesarYa', 'berakEncerYa', 'lesuYa', 'tidakSeleraMakanYa'],
    'Muntah': ['lesuYa', 'tidakSeleraMakanYa', 'mualMuntahYa'],
    'Sakit Perut': ['lesuYa', 'sakitPerutYa'],
    'Darah Rendah': ['lesuYa', 'tekananDarahRendahYa', 'pusingYa'],
    'Koma': ['tekananDarahRendahYa', 'pingsanYa'],
    'Septicaemia': ['lesuYa', 'tekananDarahRendahYa', 'suhuTinggiYa', 'lukaYa'],
    'Lumpuh': ['lesuYa', 'tidakGerakYa'],
    'Mencret Darah': ['buangAirBesarYa', 'berakEncerYa', 'berakBerdarahYa', 'lesuYa', 'tidakSeleraMakanYa'],
    'Makan Daging': ['makanSesuatuYa', 'makanDagingYa'],
    'Makan Jamur': ['makanSesuatuYa', 'makanJamurYa'],
    'Makan MakananKaleng': ['makanSesuatuYa', 'makanMakananKalengYa'],
    'Minum Susu': ['beliSusuYa', 'minumSusuYa']
    };

// Handle form submission
$('#hitung_diagnosa').click(function() {
    var gejala = [];

    // Iterate over symptoms and check if they are present
    Object.keys(symptoms).forEach(function(symptom) {
    var allConditionsMet = symptoms[symptom].every(function(id) {
        return $('#' + id).prop('checked');
    });

    if (allConditionsMet) {
        gejala.push(symptom);
    }
    });

    // Calculate diagnosis based on symptoms
    var diagnosis = calculateDiagnosis(gejala);

    // Display the result
    displayResult(gejala, diagnosis);
});


    // Function to calculate diagnosis
    function calculateDiagnosis(gejala) {
    var diagnoses = {
        'Keracunan Staphylococcus Aureus': ['Mencret', 'Muntah', 'Sakit Perut', 'Darah Rendah', 'Makan Daging'],
        'Keracunan Jamur Beracun': ['Mencret', 'Muntah', 'Sakit Perut', 'Koma', 'Makan Jamur'],
        'Keracunan Salmonellae': ['Mencret', 'Muntah', 'Sakit Perut', 'Demam', 'Makan Daging', 'Septicaemia'],
        'Keracunan Campylobacter': ['Mencret Darah', 'Sakit Perut', 'Demam', 'Minum Susu']
    };

    var result = Object.keys(diagnoses).reduce(function(acc, disease) {
        var count = diagnoses[disease].filter(function(symptom) {
        return gejala.includes(symptom);
        }).length;

        var presentase = (count / diagnoses[disease].length) * 100;
        acc[disease] = presentase;
        return acc;
    }, {});

    return result;
    }

    // Function to display the result
    function displayResult(gejala, diagnosis) {
    var maxDiagnosis = Math.max.apply(null, Object.values(diagnosis));
    var penyakit = Object.keys(diagnosis).find(function(disease) {
        return diagnosis[disease] === maxDiagnosis;
    });

    var resume = '<h3>Hasil Diagnosa</h3>';
    resume += '<p>Gejala yang Anda alami: ' + gejala.join(', ') + '</p>';
    resume += '<p>Diagnosa:</p>';

    Object.keys(diagnosis).forEach(function(disease) {
        resume += '<p>- ' + disease + ': ' + diagnosis[disease].toFixed(2) + '%</p>';
    });

    resume += '<p>Anda kemungkinan terkena penyakit <strong>' + penyakit + '</strong> dengan presentase ' + maxDiagnosis.toFixed(2) + '%</p>';

    $('#hasilDiagnosa').html(resume);
    }
});