// Load a random asset by using decodeImage API to feed to a
// setRenderImage API on the asset provided in assetLoader

const randomDiceOneNumber = Math.floor(6*Math.random())+1;
const randomDiceTwoNumber = Math.floor(6*Math.random())+1;

const dice_1_image = (asset) => {
    fetch("./assets/images/dice_" + randomDiceOneNumber + ".png").then(
        async (res) => {
            const image = await rive.decodeImage(new Uint8Array(await res.arrayBuffer()));
            asset.setRenderImage(image);
            image.unref();
        }
    );
}

const dice_2_image = (asset) => {
    fetch("./assets/images/dice_" + randomDiceTwoNumber + ".png").then(
        async (res) => {
            const image = await rive.decodeImage(new Uint8Array(await res.arrayBuffer()));
            asset.setRenderImage(image);
            image.unref();
        }
    );
}
const r = new rive.Rive({
    src: "./assets/riv/rive_dice.riv",
    stateMachines: "RollDice",
    automaticallyHandleEvents: true, 
    canvas: document.getElementById("canvas"),
    autoplay: true,
    // Callback handler to pass in that dictates what to do with an asset found in
    // the Rive file that's being loaded in

    assetLoader: (asset) => {
        // Here, we load a image asset with a random image on load of the Rive file
        // and return true, because this callback handler is responsible for loading
        if(asset.name==="Dice_1"){
            dice_1_image(asset);
            return false;
        }if(asset.name==="Dice_2"){
            dice_2_image(asset);
            return false;
        }else{
            return false;
        }
    },
    onLoad: () => {
        r.resizeDrawingSurfaceToCanvas();
    },
    onStateChange: (event) => {
        if(event.data[0]=="Empty Dice"){
            const successButton = document.querySelector(".success-button");
            const successText = document.querySelector(".success-button > div");
            if(randomDiceOneNumber>randomDiceTwoNumber){
                successText.innerHTML = "Player 1 wins!"
            }else if(randomDiceTwoNumber>randomDiceOneNumber){
                successText.innerHTML = "Player 2 wins!"
            }else{
                successText.innerHTML = "It's a tie!"
            }

            function sleep(ms) {
                return new Promise(resolve => setTimeout(resolve, ms));
            }
            
            async function demo() {
                for (let i = 0; i < 5; i++) {
                    await sleep(i * 100);
                }

                successButton.classList.remove("invisible");
                successButton.classList.add("animate-it");
            }

            demo();
            
        }
        }
});

