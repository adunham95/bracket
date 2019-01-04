function createBracket(container, teams) {
    console.log(teams);
    let newTeams = teams.map(sortTeams);
    let bracket = buildBracket(container);
    let itemCount = 0;
    let filledOutBracket = [];

    //Count how many teams
    for (let i = 0; i < newTeams.length ; i++) {
        itemCount += newTeams[i].length
    }
    itemCount = (itemCount / 2) + 1;
    console.log(itemCount);

    for (let i = 0; i < itemCount ; i++) {
        filledOutBracket[i] = []
    }

    let splitBracketLeft = newTeams.slice(0, newTeams.length / 2);
    let splitBracketRight = newTeams.slice(newTeams.length / 2, newTeams.length);

    // console.log(splitBracketLeft);
    // console.log(splitBracketRight);

    for (let j = 0; j < splitBracketLeft.length ; j++) {
            let section = splitBracketLeft[j];
            // console.log(section);
            for (let i = 0; i < section.length ; i++) {
                let teamItem = section[i];
                teamItem.teamWins += 1;

                //Adds to the first column

                for (let l = 0; l < teamItem.teamWins ; l++) {
                    filledOutBracket[l].push({
                        title: teamItem.teamTitle
                    });
                    if(l > 0){
                        for (let k = 0; k < filledOutBracket[l].length ; k++) {
                            let indexof = filledOutBracket[l-1].map(function(x) {return x.title; }).indexOf(teamItem.teamTitle);
                            filledOutBracket[l-1][indexof].class = "winner";
                        }
                    }
                }

            }
    }

    for (let j = 0; j < splitBracketRight.length ; j++) {
        let section = splitBracketRight[j];
        // console.log(section);
        for (let i = 0; i < section.length ; i++) {
            let teamItem = section[i];

            teamItem.teamWins += 1;
            for (let l = 0; l < teamItem.teamWins ; l++) {
                let index = (itemCount -1) - l;
                filledOutBracket[index].push({
                    title: teamItem.teamTitle
                });
                if(l > 0){
                    for (let k = 0; k < filledOutBracket[l].length ; k++) {
                        let indexof = filledOutBracket[(itemCount) - l].map(function(x) {return x.title; }).indexOf(teamItem.teamTitle);
                        filledOutBracket[(itemCount) - l][indexof].class = "winner";

                    }
                }
            }

        }
    }

    // console.log(filledOutBracket);

    for (let i = 0; i < filledOutBracket.length ; i++) {
        let column = filledOutBracket[i];
        // console.log(column);
        let columnElm = document.createElement("div");
        columnElm.classList.add("bracket-column");
        for (let j = 0; j < column.length; j++) {
            let bracketItem = document.createElement("div");
            bracketItem.classList.add("bracketItem");
            bracketItem.classList.add(column[j].title);
            if(typeof column[j].class !== "undefined"){
                bracketItem.classList.add(column[j].class);
            }
            bracketItem.innerHTML = `<span>${column[j].title}</span>`;
            columnElm.appendChild(bracketItem)
        }
        bracket.appendChild(columnElm);
    }

    //Sets Grand Winner
    let bracketColumns = document.querySelectorAll(".customBracket .bracket-column");
    let grandWinner = bracketColumns[Math.floor(itemCount /2)];
    grandWinner.querySelector(".bracketItem").classList.add("grandWinner")
}

function buildBracket(container) {
    let bracket = document.createElement("div");
    bracket.classList.add("customBracket");
    document.querySelector("#" + container).appendChild(bracket);

    return bracket
}

function sortTeams(teams, index) {
    let teamArray = [];

    for (let i = 0; i < teams.teams.length ; i++) {
        let newTeam = new Object();
        newTeam.sectionTitle = teams.sectionTitle;
        newTeam.sectionID = teams.id;
        newTeam.teamTitle = teams.teams[i].title;
        newTeam.teamWins = teams.teams[i].wins.length;
        teamArray.push(newTeam);
    }

    return teamArray
}