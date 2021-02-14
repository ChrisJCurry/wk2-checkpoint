let baseGained = 10
let multiplifier = 1

let resources = {
    ore: 0,
    logs: 0,
    water: 0,
}

let clickUpgrades = {
    efficiency: {
        multiplier: 1.5
    },
    more: {
        multiplier: 1.02
    },
    double: {
        multiplier: 2
    }
}

let autoUpgrades = {
    miners: {
        amount: 0,
        get cost() {
            return (100 * (this.amount * 2));
        }
    },
    waterChem: {
        amount: 0,
        get cost() {
            return (150 * (this.amount * 2));
        },
    },
    lumberjacks: {
        amount: 4,
        get cost() {
            return (200 * (this.amount * 2));
        }
    }
}

function addResource(resourceAdded) {
    for(let r in resources) {
        if(r == resourceAdded.id) {
            calculateGainedResources(Object.keys(resources).indexOf(r), baseGained, resourceAdded.id)
            return;
        }
    }
}

function calculateGainedResources(resourceType, resourceGained, resourceID) {
    console.log(resourceType, resourceGained, resourceID)
    for(let r in resources) {
        if(resourceType == Object.keys(resources).indexOf(r)) {
            resources[resourceID] += (resourceGained * multiplifier)
            let resourceText = document.getElementById(`${resourceID}-span`)
            resourceText.innerText = resources[resourceID]
            return;
        }
    }
}

function showCost(upgrade) {
    for(let job in autoUpgrades) {
        if(upgrade.id == job) {
        }
    }
    let upgradeCost
    for(let job in autoUpgrades) {
        //console.log(autoUpgrades[`${upgrade.id}`], Object.keys(autoUpgrades).indexOf(job))
        if(upgrade.id == job) {
            console.log("Cost: ", Object.keys(autoUpgrades[job]))
            upgradeCost = Object.keys(autoUpgrades[job])
        }
    }
    console.log(upgradeCost)
}