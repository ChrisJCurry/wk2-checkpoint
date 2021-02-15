let baseGained = 1

//user's resources. resets when pages is reset or player clicks reset button.
let resources = {
    ore: 0,
    water: 0,
    logs: 0,
}

//rewards that boost clicks
let clickUpgrades = {
    double: {
        amount: 0,
        cost: 100
    },
    triple: {
        amount: 0,
        cost: 250
    },
    quadruple: {
        amount: 0,
        cost: 300
    }
}

//rewards that boost automation
let autoUpgrades = {
    miners: {
        amount: 0,
        get cost() {
            return (100 + (this.amount) * (8 * 10));
        }
    },
    lumberjacks: {
        amount: 0,
        get cost() {
            return (150 + (this.amount) * (9 * 10));
        }
    },
    refiners: {
        amount: 0,
        get cost() {
            return (200 + (this.amount) * (10 * 10));
        }
    }

}

//icons clicked with their id, gets the click xp multiplier, then calls calculateGainedResources()
//to see how many resources were gained.
function addResource(resourceAdded) {
    let newXP = 0
    for (let r in resources) {

        for (let i in clickUpgrades) {
            if (i == "double") {
                let tempVar = ((clickUpgrades[i].amount + 1) * 2)
                newXP += tempVar
                continue;
            } else if (i == "triple") {
                let tempVar = ((clickUpgrades[i].amount + 1) * 3)
                newXP += tempVar
                continue;
            } else if (i == "quadruple") {
                let tempVar = ((clickUpgrades[i].amount + 1) * 4)
                newXP += tempVar
            }
        }

        if (newXP == 0) { //in case it bugs out, it wont be 0 and itll always give some resources
            newXP = 1
        } else {
            newXP = Math.floor(newXP / 3) //makes it less gained, rounded down.
        }
        if (r == resourceAdded.id) { //does the same thing if there is an id, or if no id.
            calculateGainedResources(Object.keys(resources).indexOf(r), newXP, resourceAdded.id)
            return;
        } else if (r == resourceAdded) {
            calculateGainedResources(Object.keys(resources).indexOf(r), newXP, resourceAdded)
            return;
        }
    }
}
//brings in type of resource (ore/logs/water), gets how much xp gained, and gets the id for the resource.
//sets the inner text of the resources by going through a "for...in" loop.
function calculateGainedResources(resourceType, resourceGained, resourceID) {
    for (let r in resources) {
        if (resourceType == Object.keys(resources).indexOf(r)) {
            resources[resourceID] += resourceGained
            let resourceText = document.getElementById(`${resourceID}-span`)
            resourceText.innerText = resources[resourceID]
            return;
        }
    }
}

//function to start the automation
function startInterval() {
    intervalId = setInterval(auto, 1000);
}
//function to stop the automation
function stopInterval() {
    clearInterval(intervalId)
}
//function for automation. Won't be the same, but all get boosted the same.
function auto() {
    for (let job in autoUpgrades) {
        if (job == "miners") {
            let minersMod = (autoUpgrades[job].amount * 3) + 1
            resources.ore += minersMod
        }
        if (job == "lumberjacks") {
            let logsMod = (autoUpgrades[job].amount * 3) + 1
            resources.logs += logsMod
        }
        if (job == "refiners") {
            let refinersMod = ((autoUpgrades[job].amount) * 3) + 1
            resources.water += refinersMod
        }
        showResources()
        updateText(job)
    }
    for (let job in clickUpgrades) {
        showResources()
        updateText(job)
    }
}

//called when clicked by either automated/click upgrades.
//checks if they have the resources required to buy the cost, which grows exponentially
//if they do, subtract the resource but give the upgrade.
//if they dont, call methods to say they cant afford
function upgrade(upgradeBtn) {
    for (let job in autoUpgrades) {
        if (job == upgradeBtn.id || job == upgradeBtn) {
            if (upgradeBtn.id == "miners" || upgradeBtn == "miners") {
                if (resources.ore >= autoUpgrades[job].cost) {
                    resources.ore -= autoUpgrades[job].cost
                    autoUpgrades[job].amount++
                    showUpgrades(job)
                    showResources()
                }
            }
            if (upgradeBtn.id == "lumberjacks" || upgradeBtn == "lumberjacks") {
                if (resources.logs >= autoUpgrades[job].cost) {
                    resources.logs -= autoUpgrades[job].cost
                    autoUpgrades[job].amount++
                    showUpgrades(job)
                    showResources()
                }
            }
            if (upgradeBtn.id == "refiners" || upgradeBtn == "refiners") {
                if (resources.water >= autoUpgrades[job].cost) {
                    resources.water -= autoUpgrades[job].cost
                    autoUpgrades[job].amount++
                    showUpgrades(job)
                    showResources()
                }
            }


            return;
        }
    }
    for (let job in clickUpgrades) {
        if (job == upgradeBtn.id || job == upgradeBtn) {
            if (upgradeBtn.id == "double" || upgradeBtn == "double") {
                if (resources.ore >= clickUpgrades[job].cost) {
                    resources.ore -= clickUpgrades[job].cost
                    clickUpgrades[job].amount++
                    showUpgrades(job)
                    showResources()
                } else if (resources.logs >= clickUpgrades[job].cost) {
                    resources.logs -= clickUpgrades[job].cost
                    clickUpgrades[job].amount++
                    showUpgrades(job)
                    showResources()
                } else if (resources.water >= clickUpgrades[job].cost) {
                    resources.water -= clickUpgrades[job].cost
                    clickUpgrades[job].amount++
                    showUpgrades(job)
                    showResources()
                }
                return;
            }
            if (upgradeBtn.id == "triple" || upgradeBtn == "triple") {
                if (resources.ore >= clickUpgrades[job].cost) {
                    resources.ore -= clickUpgrades[job].cost
                    clickUpgrades[job].amount++
                    showUpgrades(job)
                    showResources()
                } else if (resources.logs >= clickUpgrades[job].cost) {
                    resources.logs -= clickUpgrades[job].cost
                    clickUpgrades[job].amount++
                    showUpgrades(job)
                    showResources()
                } else if (resources.water >= clickUpgrades[job].cost) {
                    resources.water -= clickUpgrades[job].cost
                    clickUpgrades[job].amount++
                    showUpgrades(job)
                    showResources()
                }
                return;
            }
            if (upgradeBtn.id == "quadruple" || upgradeBtn == "quadruple") {
                if (resources.ore >= clickUpgrades[job].cost) {
                    resources.ore -= clickUpgrades[job].cost
                    clickUpgrades[job].amount++
                    showUpgrades(job)
                    showResources()
                } else if (resources.logs >= clickUpgrades[job].cost) {
                    resources.logs -= clickUpgrades[job].cost
                    clickUpgrades[job].amount++
                    showUpgrades(job)
                    showResources()
                } else if (resources.water >= clickUpgrades[job].cost) {
                    resources.water -= clickUpgrades[job].cost
                    clickUpgrades[job].amount++
                    showUpgrades(job)
                    showResources()
                }
                return;
            }
        }
    }
}

//shows resources. basically the draw function for the resources.
function showResources() {
    for (let resource in resources) {
        let resourceText = document.getElementById(`${resource}-span`)
        let template = ""
        template = `${resources[resource]}`
        resourceText.innerText = template
    }
}

//shows upgrades. basically the draw funciton for the upgrades.
function showUpgrades(upgradeBtn) {
    for (let job in autoUpgrades) {
        if (upgradeBtn.id == job || upgradeBtn == job) {
            let template = ""
            let upgradeCostTextElem
            if (upgradeBtn.id != null) {
                upgradeCostTextElem = document.getElementById(`${upgradeBtn.id}`)
            } else if (upgradeBtn != null) {
                upgradeCostTextElem = document.getElementById(`${upgradeBtn}`)
            }
            updateText(upgradeBtn)
        }
    }

    for (let job in clickUpgrades) {
        let template = ""
        let upgradeCostTextElem = ""
        if (upgradeBtn.id != null) {
            upgradeCostTextElem = document.getElementById(`${upgradeBtn.id}`)
        } else if (upgradeBtn != null) {
            upgradeCostTextElem = document.getElementById(`${upgradeBtn}`)
        }
        let warnString = "CAN'T AFFORD"
        if (job == upgradeBtn.id || job == upgradeBtn) {
            template = `${job.toUpperCase()}: ${clickUpgrades[job].amount} \n Cost: ${clickUpgrades[job].cost} \n ${canAfford(upgradeBtn) ? "" : warnString}`
            if (!canAfford(upgradeBtn)) {
                upgradeCostTextElem.style.color = 'red'; //warns if you cant afford it
                upgradeCostTextElem.style.fontWeight = 'bold'
            } else {
                upgradeCostTextElem.style.color = 'white';
                upgradeCostTextElem.style.fontWeight = 'bold'
            }
            upgradeCostTextElem.innerText = template

        }

    }
}

//updates text so it can be modified whenever the user is able to afford an upgrade.
function updateText(upgradeBtn) {
    for (let job in autoUpgrades) {
        let template = ""
        let upgradeCostTextElem = ""
        if (upgradeBtn.id != null) {
            upgradeCostTextElem = document.getElementById(`${upgradeBtn.id}`)
        } else if (upgradeBtn != null) {
            upgradeCostTextElem = document.getElementById(`${upgradeBtn}`)
        }
        let warnString = "CAN'T AFFORD"
        if (job == upgradeBtn.id || job == upgradeBtn) {
            template = `${job.toUpperCase()}: ${autoUpgrades[job].amount} \n Cost: ${autoUpgrades[job].cost} \n ${canAfford(upgradeBtn) ? "" : warnString}`
            if (!canAfford(upgradeBtn)) {
                upgradeCostTextElem.style.color = 'red';
                upgradeCostTextElem.style.fontWeight = 'bold'
            } else {
                upgradeCostTextElem.style.color = 'white';
                upgradeCostTextElem.style.fontWeight = 'bold'
            }
            upgradeCostTextElem.innerText = template

        }

    }
    for (let job in clickUpgrades) {
        let template = ""
        let upgradeCostTextElem = ""
        if (upgradeBtn.id != null) {
            upgradeCostTextElem = document.getElementById(`${upgradeBtn.id}`)
        } else if (upgradeBtn != null) {
            upgradeCostTextElem = document.getElementById(`${upgradeBtn}`)
        }
        let warnString = "CAN'T AFFORD"
        if (job == upgradeBtn.id || job == upgradeBtn) {
            template = `${job.toUpperCase()}: ${clickUpgrades[job].amount} \n Cost: ${clickUpgrades[job].cost} \n ${canAfford(upgradeBtn) ? "" : warnString}`
            if (!canAfford(upgradeBtn)) {
                upgradeCostTextElem.style.color = 'red';
                upgradeCostTextElem.style.fontWeight = 'bold'
            } else {
                upgradeCostTextElem.style.color = 'white';
                upgradeCostTextElem.style.fontWeight = 'bold'
            }
            upgradeCostTextElem.innerText = template

        }

    }
}

//checks to see if the user can afford whatever theyre trying to buy.
//goes through job list, if they have more than they need, returns true, otherwise, false.
function canAfford(upgradeBtn) {
    for (let job in autoUpgrades) {
        if (upgradeBtn.id == job || upgradeBtn == job) {
            if (job == "miners") {
                if (resources.ore >= autoUpgrades[job].cost) {
                    return true;
                } else {
                    return false;
                }
            } else if (job == "lumberjacks") {
                if (resources.logs >= autoUpgrades[job].cost) {
                    return true;
                } else {
                    return false;
                }
            } else if (job == "refiners") {
                if (resources.water >= autoUpgrades[job].cost) {
                    return true;
                } else {
                    return false;
                }
            }

        }
    }
    for (let job in clickUpgrades) {
        if (upgradeBtn.id == job || upgradeBtn == job) {
            if (job == "double") {
                for (r in resources) {
                    if (clickUpgrades[job].cost < resources[r]) {
                        return true;
                    }
                }
            } else if (job == "triple") {
                for (r in resources) {
                    if (clickUpgrades[job].cost < resources[r]) {
                        return true;
                    }

                }
            } else if (job == "quadruple") {
                for (r in resources) {
                    if (clickUpgrades[job].cost < resources[r]) {
                        return true;
                    }

                }
            }
        }
    }
    return false;
}

//resets game.
//called by reset button.
//confirms user(pauses game until confirmed) before wiping data.
//resets resources, automated upgrades amount, and click upgrades amount.
function resetGame() {
    let choice = confirm("Are you sure you want to restart?")
    if (choice == true) {
        stopInterval(intervalId)
        for (let r in resources) {
            resources[r] = 0
        }
        showResources()
        for (let job in autoUpgrades) {
            autoUpgrades[job].amount = 0
            showUpgrades(job)
        }
        for (let job in clickUpgrades) {
            clickUpgrades[job].amount = 0
            showUpgrades(job)
        }
        startInterval()
    } else {
        return;
    }

}

//starts up the automated upgrade drawing
for (let autoUpgrade in autoUpgrades) {
    showUpgrades(autoUpgrade)
}
//starts up the clickable upgrade drawing
for (let clickUpgrade in clickUpgrades) {
    showUpgrades(clickUpgrade)
}

//draws resources (default to 0)
showResources()
//starts the automation process.
startInterval()