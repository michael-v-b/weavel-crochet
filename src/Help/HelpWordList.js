const HelpWordList = () => [
        `$c$ About Weavel`,

            `$b$ Weavel is a simple, user-friendly, 3D modeling software designed to help crocheters make their own custom amigurumi 
            crochet patterns. 
            This web-page serves as a guide to help you, step-by-step, throughout the process of creating your own custom design using
            Weavel.
            If there is a specific section you are confused about, use the Table of Contents to the left to be taken down to that 
            section of the page.`,

        `$c$ Getting Started`,
            `$b$ Before you can get started with Weavel, you will have to create an account. Simply click \"Sign Up\" in top-right corner of the screen and create your account.
            After you've finished verify your email and log in using the \"Log in\" button in the top-right corner of the screen.`,

        '$c$ Projects',

            '$s$ Creating a Project',
                `$b$ After you have logged in, it\'s time for you to create a project. Open the drop down menu in the top-right hand corner 
                and click \"Your Projects\". You should now be seeing a list of all your projects. In order to create a new project, click on the \"+\" button.
                A new project should have appeared in the menu. Now click on it to open.`,
                `$b$ Keep in mind that you will only be allowed to have 3 projects at a time.`,

            `$s$ Deleting a Project`,
                `$b$ To delete your project, click on \"Remove Project\" in the \"My Projects\" Dashboard. This will make a small \"x\" button 
                appear in the top-right corner of each project, and make them shake. Click on the \"x\" button to delete a project.`,

            `$s$ Renaming your Project`,
                `$b$ In order to rename your project, you must first open it. Click on the text box directly under the Banner to change the name
                of your project. The project's name will have a maximum of 30 characters and will be renamed to \"New Project\" if left
                blank.`,

        '$c$ Canvas',

        `$b$ The Canvas is the central screen where you will be able to see your model and all the objects that make it up. 
        You can click on an object in order to select it and clock on it a second time to deselect. Holding shift will allow you to
        select multiple objects at once.`,



        `$c$ Modes`,

            `$b$ In order to perform any action, your project must be in the correct mode. You can change your modes using the Mode Bar 
            on the top of your project. In order to leave any mode, you can either select a different mode, or click on your selected
            mode a second time. Depending on which mode you have selected, it will change which options you have available in the Tool
            Window in the top-left section of your project.`,

            `$s$ Camera`,
                `$b$ In order to move the camera and get a different perspective on your creation, you have to enable Camera Mode.
                left-click to move the camera around a point and right-click to pan the camera. To zoom scroll the mouse wheel, 
                up to zoom-in and down to zoom-out.
                While in this mode you will be unable to select or deselect objects.`,

            `$s$ Tool`,
                `$b$ This mode is used to select the various tools for transforming any selected object. If you need to change the position
                or rotation of an object you must first select this mode. We will get further into depth with Translation and Rotation in the 
                Transformations section`,

            `$s$ Add Shape`,
                `$b$ While in this mode, you will be able to see the large variety of shapes that you are able to add into your project.
                Simply press the button to add the shape into the center of your world. You can learn more about the different shapes and
                their uses in the shapes section.`,
                `$b$ To delete a shape you can select the shape and either press delete, or backspace key`,
                `$b$ Each project will have a maximum of 25 shapes.`,
                
        `$c$ Shapes`,

            `$b$ Shapes are the main things you will be interacting with in your project. These are the essence of your model.
            You can adjust their position, rotation and dimensions in any way you want to make whatever you want to create come to life.
            Here will be a brief summary of the different types of shapes and what uses they would have for your project.`,
            `$b$ It is worth mentioning that if a shape has 2 variables that affect its dimensions, i.e. Cones, Capsules and Silos which all have
            fields for circumference and height, changing one value will affect the other to ensure that the shape remains possible to make using
            crochet. `,

            `$s$ 3D Shapes`,
                `$b$ These are the meat and potatoes of your model. It's what seperates amigurumi from regular crochet and what will give your projects depth.
                Here is a list of all the 3D shapes that you'll be able to use in Weavel and what makes them special.`,

                `$u$ Ball`,
                    `$b$ A classic sphere. Often used for heads, round bodies, or small hand orbs it is a very common shape in amigurumi.
                    In Weavel you will be able to change the ball's size based on its circumference in terms of stitches. Keep in mind that, 
                    because you start with a Magic Ring containing 6 stitches and you must evenly distribute your increases, your ball's circumference must be
                    a multiple of 6.`,

                '$u$ Silo',
                    `$b$ This is our first concave shape. It is a perfect additive shape since it doesn't have extra which can cause 
                    weird effects when sewing the shapes together. It can be used to create arms, legs, or bodies, 
                    or if you're adventurous, bunny ears! You can adjust the circumference in terms of rows and the height in terms of rounds.`,

                '$u$ Capsule',
                    `$b$ Similar to a silo, the capsule returns to concavity. It is essentially a longer version of a sphere and can be used for 
                    animals with longer bodies such as quadrapeds. You can adjust the circumference in terms of rows and the height in terms of rounds.`,

            // MIGHT CHANGE IMPLEMENTATION OF THE CONE
                '$u$ Cone',
                    `$b$ This shape is mostly used for ears and beaks, but it can also be used for horns and other conical shapes.
                    You can adjust the circumference in terms of stitches and the height in terms of rows.`,

                '$u$ Cylinder',
                    `$b$ Like a silo but without the curve, the cylinder can be used in to form long necks or connect 2 different shapes.
                    You can adjust the cylinder's height in terms of rounds and circumference in terms of stiches.`,

                '$u$ Box',
                    `$b$ While it is not the most common shape in Amigurumi, it can still have its uses for more niche artificial looking patterns.
                    You can adjust each of the Box's dimensions individually to cuztomize it as you need.`,


            `$s$ 2D Shapes`,
            
                '$u$ Circle',
                    `$b$ A common beginner shape, the circle can be used for ears and different colored bellies. You can adjust its circumference
                    in terms of stitches.`,
                `$u$ Square`,
                    `$b$ A simple single crochet patch which stems from a chain. The square has fairly niche usage in amigurumi 
                    since it mostly consists for more natural, rounder shapes. However, the skilled amigurumi can still find a purpose
                    for it. You can adjust the dimensions of the square in both height and width.`,
                '$u$ Stadium',
                    `$b$ The stadium gets its name from the fact it looks like a stadium. It is flat and shaped like a pill. It can
                    be used for ears and belly plates. You can edit the stadium through its length and width properties.`,
                '$u$ Chain',
                    `$b$ The most simple shape, it is technically misplaced here as it is 1-dimensional. The simple chain is often
                    used for tails, arms and legs. However, keep in mind that the chain is not able to support itself and will flop
                    in real life. You can adjust the chain's length.`,
                    `$u$ Triangle`,
                    `$b$ While at first it may seem niche, the triangle can have many uses in amigurumi. It is perfect for flat pointed ears, wings or
                    webbed feet! You can adjust the triangle's height in terms of rows and base in terms of stitches.`,



        '$c$ Transformations',

            `$b$ These are the tools that directly affect physical aspects of an object such as position, or orientation. In order to
            apply any of these tranformations, you must first select the shape and then select the proper tool from the tool window in
            tool mode.`,

            '$s$ Translate',
                `$b$ The translation tool is responsible for changing an object's position relative to the origin. When in translate
                mode a widget will pop up on screen with lines representing the world axes. Red represents the x-axis, green the y-axis,
                and blue the z-axis. You can click and drag any of those lines to translate the object along its respective axis. Additionally,
                you can drag the white box in the center to drag the object freely around the screen. You can also adjust an object's position
                directly in the info-window when selecting it.`,
        

            '$s$ Rotate',
                `$b$ The rotation tool is used to rotate an object around a certain axis. When selecting the rotation tool, a widget
                will appear in the center of the selected objects. This widget will feature different color rings with balls on them.
                Simply click on the rings or balls to rotate the object around a different world axis, dictated by the color of the ring.
                Red rotates around the x-axis, green around the y-axis, and blue around the z-axis. Alternatively, you can directly change
                the orientation of a selected object using the info window. Keep in mind the orientation is in term of degrees.`,

        '$c$ Colors',

            `$b$ Color is an important part of the design process. Being able to change an object's color is quintessential to making your
            designs recognizable and eye-catching. Weavel uses a unique color system to represent the different colors of yarn you will 
            need in order to complete the design.`,

            '$u$ Adding a color',
                `$b$ To add a color simply press the \"+\" button in the \"Color Window\" in the bottom-left corner of the screen. This will
                add a new color, in your color options.`,

            `$u$ Changing an object's color`,
                `$b$ Each object has a color which can be changed in their \"Info Window\". By clicking the \"Color\" option it opens a
                drop down menu with all of your color options. Additionally, you can change the color option directly by clicking it in
                the \"Color Window\" and either adding a new hex-code or adjusting the circle in the color graph.
                 Changing a color option will change the color of all objects assigned to that option at the same time.
                This can be very useful for testing out color palettes.`,
            '$u$ Removing a color',
                `$b$ To remove a color, simply click on the color in the \"Color Window\" and click on the \"Remove Color\" button.
                You can have a minimum of 1 color and a maximum of 25 colors.`,
        `$c$ Object List`,
            `$b$ The object list is the window on the top-right of your project. It features all of the objects used in your project. as well as their names.
            To rename an object you can click the \"Name\" option in the \"Info Window\". If you click on the object in the object list, it will automatically
            select that object. Press shift + click or ctrl + click to select multiple objects at once.`,

        '$c$ Exporting',
        `$b$ Once you get your project to a level that you are satisfied with, it is now time to print your pattern. You can do so by clicking
         \"Export to PDF\" in the top-right corner. After clicking, you should download a pdf-file telling you how to create each of the shapes 
         you made.`
    ];
export default HelpWordList;