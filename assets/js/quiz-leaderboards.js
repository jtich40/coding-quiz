// global DOM variable
let resetBtn = document.getElementById('reset')

function showLeaderboards () {
    // Grabs all previous scores from local storage
    let leaderboards = JSON.parse(localStorage.getItem('leaderboards'))

    // sorts leaderboards scores in descending order
    leaderboards.sort(function (a, b) {
        return b.score - a.score;
    });

    for (let i = 0; i < leaderboards.length; i += 1) {
        // build list items for each score
        const postedScores = leaderboards[i].initials + ' : ' + leaderboards[i].score;
        const liScore = document.createElement('li')
        liScore.textContent = postedScores
        // render list items to leaderboards page
        let olEl = document.getElementById('leaderboards')
        olEl.appendChild(liScore);
    }
}

// makes sure the function isn't executed if scores are cleared
if(localStorage.getItem('leaderboards')) {
    showLeaderboards();
}

function clearLeaderboards () {
    // remove scores from local storage
    localStorage.removeItem('leaderboards');
    // reload leaderboards page
    location.reload();
}
// clears scores from leaderboards page
resetBtn.addEventListener('click', clearLeaderboards)