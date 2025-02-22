// Khởi tạo Babylon.js
const canvas = document.getElementById("renderCanvas");
const engine = new BABYLON.Engine(canvas, true);

const createScene = function () {
    const scene = new BABYLON.Scene(engine);
    scene.clearColor = new BABYLON.Color4(0, 0, 0, 1); // Nền đen

    // Tạo camera
    const camera = new BABYLON.ArcRotateCamera("Camera", Math.PI / 2, Math.PI / 4, 15, BABYLON.Vector3.Zero(), scene);
    camera.attachControl(canvas, true);

    // Tạo ánh sáng
    const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), scene);
    
    // Tạo mặt đất
    const ground = BABYLON.MeshBuilder.CreateGround("ground", { width: 20, height: 20 }, scene);

    // Load các cửa hàng từ file GLB
    const loadGLB = (filePath, position) => {
        BABYLON.SceneLoader.ImportMesh("", "assets/", filePath, scene, function (meshes) {
            const model = meshes[0];
            model.position = position;
        });
    };

    // Load 3 cửa hàng khác nhau
    loadGLB("restaurant1.glb", new BABYLON.Vector3(-5, 0, 0));
    loadGLB("restaurant2.glb", new BABYLON.Vector3(5, 0, 0));
    loadGLB("food-truck.glb", new BABYLON.Vector3(0, 0, 5));

    return scene;
};

const scene = createScene();
engine.runRenderLoop(() => {
    scene.render();
});

window.addEventListener("resize", () => {
    engine.resize();
});
