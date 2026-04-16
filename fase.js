// Date input: set max to today and default to today
const dateInput = document.getElementById('lastPeriod');
const today = new Date();
const todayStr = today.toISOString().split('T')[0];
dateInput.max = todayStr;

// Phase data
const phases = {
    mestruale: {
        emoji: '🌊',
        desc: 'Il tuo corpo sta rilasciando il rivestimento dell\'utero. Gli ormoni sono ai minimi. È il momento di ascoltarti, rallentare e ricaricare le energie.',
        tips: {
            fitness: 'Movimento dolce: yoga ristorativo, camminate, stretching. Evita allenamenti intensi. Il tuo corpo ha bisogno di riposo attivo.',
            beauty: 'Skincare idratante e lenitiva. Maschere nutrienti. La pelle può essere più sensibile — evita esfolianti aggressivi.',
            vibes: 'Momento di introspezione. Journaling, libri, coperte calde. Concediti il diritto di fare meno e sentire di più.'
        }
    },
    follicolare: {
        emoji: '🌱',
        desc: 'Gli estrogeni stanno salendo. Energia in crescita, umore positivo, creatività al top. Sei nel momento migliore per iniziare nuove cose.',
        tips: {
            fitness: 'Forza e cardio: pesi, HIIT, corsa. Il tuo corpo risponde bene a stimoli intensi. Prova qualcosa di nuovo.',
            beauty: 'La pelle è al suo meglio: luminosa e reattiva. Buon momento per trattamenti esfolianti delicati e routine attive.',
            vibes: 'Energia espansiva. Pianifica, socializza, prendi decisioni. È il momento di dire sì a progetti ambiziosi.'
        }
    },
    ovulatoria: {
        emoji: '☀️',
        desc: 'Picco di energia fisica e mentale. Estrogeni al massimo, libido alle stelle. Sei al tuo top — goditelo.',
        tips: {
            fitness: 'Massima performance: allenamenti intensi, spinte, PR. Il tuo corpo è una macchina. Sfrutta questo momento.',
            beauty: 'Pelle radiosa naturalmente. Make-up minimo, valorizza la luminosità. Buono per foto e momenti importanti.',
            vibes: 'Socialità ai massimi, carisma alto. Appuntamenti, presentazioni, eventi. Brilla senza paura.'
        }
    },
    luteale: {
        emoji: '🌙',
        desc: 'Il progesterone sale, l\'energia cala dolcemente. Focus interiore, bisogno di calma. Sensibilità maggiore — è normale.',
        tips: {
            fitness: 'Pilates, yoga, forza moderata. Riduci l\'intensità nell\'ultima settimana. Ascolta il tuo corpo.',
            beauty: 'La pelle può essere più reattiva. Idratazione profonda, evita prodotti nuovi. Attenzione a brufoletti ormonali.',
            vibes: 'Focus su ciò che conta. Scadenze, pulizie, riordino. Se ti senti più sensibile, va bene così.'
        }
    }
};

// Calculate phase from day of cycle
function getPhase(dayOfCycle, cycleLength) {
    const ovulationDay = cycleLength - 14;
    if (dayOfCycle <= 5) return 'mestruale';
    if (dayOfCycle < ovulationDay - 1) return 'follicolare';
    if (dayOfCycle <= ovulationDay + 1) return 'ovulatoria';
    return 'luteale';
}

// Phase name capitalized
function phaseName(key) {
    return key.charAt(0).toUpperCase() + key.slice(1);
}

// Calculate current day of cycle
function getDayOfCycle(lastPeriodDate, cycleLength) {
    const now = new Date();
    now.setHours(0, 0, 0, 0);
    const last = new Date(lastPeriodDate);
    last.setHours(0, 0, 0, 0);
    const diffDays = Math.floor((now - last) / (1000 * 60 * 60 * 24));
    // If more than one cycle has passed, wrap
    const day = (diffDays % cycleLength) + 1;
    return day;
}

// Build calendar for next 28 days
function buildCalendar(lastPeriodDate, cycleLength) {
    const grid = document.getElementById('calendarGrid');
    grid.innerHTML = '';
    const start = new Date();
    start.setHours(0, 0, 0, 0);
    const last = new Date(lastPeriodDate);
    last.setHours(0, 0, 0, 0);
    const baseDiff = Math.floor((start - last) / (1000 * 60 * 60 * 24));

    for (let i = 0; i < 28; i++) {
        const currentDate = new Date(start);
        currentDate.setDate(start.getDate() + i);
        const dayOfCycle = ((baseDiff + i) % cycleLength) + 1;
        const phase = getPhase(dayOfCycle, cycleLength);

        const cell = document.createElement('div');
        cell.className = `calendar-cell cell-${phase}`;
        if (i === 0) cell.classList.add('today');

        const emojiDiv = document.createElement('div');
        emojiDiv.className = 'emoji';
        emojiDiv.textContent = phases[phase].emoji;

        const dateDiv = document.createElement('div');
        dateDiv.textContent = currentDate.getDate();

        cell.appendChild(emojiDiv);
        cell.appendChild(dateDiv);
        grid.appendChild(cell);
    }
}

// Main calculate function
document.getElementById('calcBtn').addEventListener('click', () => {
    const dateValue = dateInput.value;
    const cycleLength = parseInt(document.getElementById('cycleLength').value);

    if (!dateValue) {
        alert('Per favore inserisci la data dell\'ultima mestruazione.');
        return;
    }
    if (isNaN(cycleLength) || cycleLength < 21 || cycleLength > 40) {
        alert('La durata del ciclo deve essere tra 21 e 40 giorni.');
        return;
    }

    const dayOfCycle = getDayOfCycle(dateValue, cycleLength);
    const phase = getPhase(dayOfCycle, cycleLength);
    const phaseData = phases[phase];

    // Update UI
    document.getElementById('phaseEmoji').textContent = phaseData.emoji;
    document.getElementById('phaseDay').textContent = `Giorno ${dayOfCycle} del ciclo`;
    document.getElementById('phaseName').textContent = phase;
    document.getElementById('phaseDesc').textContent = phaseData.desc;
    document.getElementById('tipFitness').textContent = phaseData.tips.fitness;
    document.getElementById('tipBeauty').textContent = phaseData.tips.beauty;
    document.getElementById('tipVibes').textContent = phaseData.tips.vibes;

    buildCalendar(dateValue, cycleLength);

    // Show result and scroll
    const result = document.getElementById('result');
    result.classList.add('visible');
    setTimeout(() => {
        result.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
});