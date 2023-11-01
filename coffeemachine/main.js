let timerFinished = false;
function CoffeeMachine(power) {
    const WATER_HEAT_CAPACITY = 5000;
    this.waterAmount = 100;
    this.milkAmount = 50;
    this.coffeeAmount = 30;
    this.waterAmountS = 100;
    this.milkAmountS = 105;
    this.coffeeAmountS = 103;

    let getBoilTime = function() {
        return (this.waterAmount + this.milkAmount + this.coffeeAmount) * WATER_HEAT_CAPACITY * 80 / power;
    }.bind(this);

    function onReady() {
        $('.text').text('the coffee is ready')
        setTimeout(function(){
            $('.text').text("it's a coffee machine")
        },3000)
        $('.milkBlock').css('display','none');
        $('.coffeeBlock').css('display','none');
        clearInterval(timerId);
        timerFinished = true;
    stopBtn.disabled = true;
    }

    let timerId;

    this.run = function() {
        let boilTime = getBoilTime();
        updateTimer(boilTime);

        timerId = setInterval(function() {
            boilTime -= 1000;
            if (boilTime <= 0) {
                onReady();
                updateTimer(0);
                clearInterval(timerId);
            } else {
                updateTimer(boilTime);
            }
        }, 1000);
    };

    this.stop = function() {
        clearInterval(timerId);
        updateTimer(0);
        $('.animBox').css('display', 'none');
    };

    function updateTimer(time) {
        const minutes = Math.floor(time / 60000);
        const seconds = Math.floor((time % 60000) / 1000);
        const timeString = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
        $('#time').text(timeString);
    }

    this.addMilk = function(amount) {
        this.milkAmountS -= amount ;
        $('#milk1').text(this.milkAmountS);
        checkIngredientAvailability();
      };
      

    this.addWater = function(amount) {
        this.waterAmountS -= amount;
        $('#water1').text(this.waterAmountS);
        checkIngredientAvailability(); // Оновлюємо значення води
    };

    this.addCoffee = function(amount) {
        this.coffeeAmountS -= amount;
        $('#coffee1').text(this.coffeeAmountS);
        checkIngredientAvailability();
    };
}

let coffeeMachine = new CoffeeMachine(15000);
coffeeMachine.addWater(10);
coffeeMachine.addCoffee(3);
coffeeMachine.addMilk(5); // Add 50 units of milk

runBtn.disabled = true; // Disable the "Run" button initially
stopBtn.disabled = true;
$('.pac').click(function() {
    $('.pac').css('display', 'none');
    $('.cup').css('display', 'flex');
    runBtn.disabled = false; // Enable the "Run" button // Enable the "Run" button
});

runBtn.onclick = function() {
    if (!runBtn.disabled) {
        coffeeMachine.run();
        $('.animBox').css('display', 'flex');
        $('.box').css('display', 'flex');
        $('.cup').css('position', 'fixed');
        $('.cup').css('top', 443 + 'px');
        $('.cup').css('left', 686 + 'px');
        coffeeMachine.addWater(10);
        coffeeMachine.addCoffee(3);
        coffeeMachine.addMilk(5);
        $('.milkBlock').css('display', 'flex');
        $('.coffeeBlock').css('display', 'flex');
        stopBtn.disabled = false;
    }
}

stopBtn.onclick = function() {
    coffeeMachine.stop();
    $('.animBox').css('display', 'none');
    $('.box').css('display', 'none');
    coffeeMachine.addWater(-10);
        coffeeMachine.addCoffee(-3);
        coffeeMachine.addMilk(-5);
        checkIngredientAvailability();
        $('.text').text('coffee is not made')
        setTimeout(function(){
            $('.text').text("it's a coffee machine")
        },3000)
        stopBtn.disabled = true;
};



function checkIngredientAvailability() {
    if (coffeeMachine.waterAmountS === 0) {
        $('.loading').text('water is out');
        runBtn.disabled = true;
        coffeeMachine.addWater(0);
        $('.box').css('display', 'none');
    } else if (coffeeMachine.coffeeAmountS === 0) {
        $('.loading').text('coffee is out');
        runBtn.disabled = true;
        coffeeMachine.addCoffee(0);
        $('.box').css('display', 'none');
    } else if (coffeeMachine.milkAmountS === 0) {
        $('.loading').text('milk is out');
        runBtn.disabled = true;
        coffeeMachine.addMilk(0);
        $('.box').css('display', 'none');
    } else {
        $('.loading').text("it's a coffee machine");
    }
}

