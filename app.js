let baseGained = 1

let resources = {
    ore: 500,
    water: 1000,
    logs: 1500,
}

let clickUpgrades = {
    double: {
        amount: 0,
        cost: 500
    },
    triple: {
        amount: 0,
        cost: 750
    },
    quadruple: {
        amount: 0,
        cost: 900
    }
}

let autoUpgrades = {
    miners: {
        amount: 0,
        get cost() {
            return (100 + (this.amount) * (4 * 10));
        }
    },
    lumberjacks: {
        amount: 0,
        get cost() {
            return (150 + (this.amount) * (5 * 10));
        }
    },
    refiners: {
        amount: 0,
        get cost() {
            return (200 + (this.amount) * (6 * 10));
        }
    }

}

function addResource(resourceAdded) {
    let newXP = 1
    for (let r in resources) {

        for (let i in clickUpgrades) {
            console.log("index: ", Object.keys(clickUpgrades).indexOf(i))
            console.log("value: ", clickUpgrades[i].cost)
            console.log(clickUpgrades[i].amount)
            newXP += (clickUpgrades[i].amount) * Object.keys(clickUpgrades).indexOf(i) + 2
        }
        //console.log("New xp: ", newXP)
        if (r == resourceAdded.id) {
            calculateGainedResources(Object.keys(resources).indexOf(r), newXP, resourceAdded.id)
            return;
        } else if (r == resourceAdded) {
            calculateGainedResources(Object.keys(resources).indexOf(r), newXP, resourceAdded)
            return;
        }
    }
}

function calculateGainedResources(resourceType, resourceGained, resourceID) {
    //console.log(resourceType, resourceGained, resourceID)
    for (let r in resources) {
        if (resourceType == Object.keys(resources).indexOf(r)) {
            resources[resourceID] += resourceGained
            let resourceText = document.getElementById(`${resourceID}-span`)
            resourceText.innerText = resources[resourceID]
            return;
        }
    }
}

function startInterval() {
    intervalId = setInterval(auto, 1000);
}

function stopInterval() {
    clearInterval(intervalId)
}

function auto() {
    for (let job in autoUpgrades) {
        if (job == "miners") {
            let minersMod = (autoUpgrades[job].amount * 2) + 1
            resources.ore += minersMod
        }
        if (job == "lumberjacks") {
            let logsMod = (autoUpgrades[job].amount * 2) + 1
            resources.logs += logsMod
        }
        if (job == "refiners") {
            let refinersMod = ((autoUpgrades[job].amount) * 2) + 1
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

function showResources() {
    for (let resource in resources) {
        let resourceText = document.getElementById(`${resource}-span`)
        let template = ""
        template = `${resources[resource]}`
        resourceText.innerText = template
    }
}

function showUpgrades(upgradeBtn) {
    for (let job in autoUpgrades) {
        let canAffordBool = false
        if (upgradeBtn.id == job || upgradeBtn == job) {
            let template = ""
            let upgradeCostTextElem
            if (upgradeBtn.id != null) {
                upgradeCostTextElem = document.getElementById(`${upgradeBtn.id}`)
            } else if (upgradeBtn != null) {
                upgradeCostTextElem = document.getElementById(`${upgradeBtn}`)
            }
            //console.log("Button: ", canAfford(upgradeBtn))
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
        //console.log(job, upgradeBtn.id)
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
        //console.log(job, upgradeBtn.id)
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

for (let autoUpgrade in autoUpgrades) {
    showUpgrades(autoUpgrade)
}
for (let clickUpgrade in clickUpgrades) {
    showUpgrades(clickUpgrade)
}

showResources()
startInterval()