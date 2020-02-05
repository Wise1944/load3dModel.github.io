 if ( WEBGL.isWebGLAvailable() === false ) {

				document.body.appendChild( WEBGL.getWebGLErrorMessage() );

			}
			var container = document.getElementById( 'container' );
			var mouseHelper;
			var intersection = {
					intersects: false,
					point: new THREE.Vector3(),
					normal: new THREE.Vector3()					
				};
				var emitter ;
			var plasmaBalls = [];
			var target;
			var mouse = new THREE.Vector2();
			var loader,camera ;
			var raycaster;
			var container, stats, controls;
			var camera, scene, light;
			var renderer = new THREE.WebGLRenderer();
			var player;
			 var speed = 50;
             var clock = new THREE.Clock();
             var delta = 0;
			 var controls = {
                          moveForward: false,
                          moveBackward: false,
                          moveLeft: false,
                          moveRight: false,
                          Tower_rotation_r:false,
                          Tower_rotation_l:false,
                          Rotation_base_r:false,
                          Rotation_base_l:false
                      };
			// camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 0.01, 10000 );
			var mixer;
			var Tank={
				positionX:0,
				positionY:0,
				positionZ:0,
				tower:"",
				body:"",
				hp:""
			};
			 init();
			animate();

			function init() {

				//container = document.createElement( 'div' );
				document.body.appendChild( container );

				camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 0.01, 10000 );
				camera.position.set( 1,50, 0 );
				//camera.rotation.set(100,10,0);

				controls = new THREE.OrbitControls(camera);
				controls.target.set( 100, 15, 0 );
				controls.update();

				scene = new THREE.Scene();
				scene.background = new THREE.Color( 0xa0a0a0 );
				scene.fog = new THREE.Fog( 0xa0a0a0, 200, 1000 );

				light = new THREE.HemisphereLight( 0xffffff, 0x444444 );
				light.position.set( 0, 200, 0 );
				scene.add( light );

				light = new THREE.DirectionalLight( 0xffffff );
				light.position.set( 0, 200, 100 );
				light.castShadow = true;
				light.shadow.camera.top = 180;
				light.shadow.camera.bottom = - 100;
				light.shadow.camera.left = - 120;
				light.shadow.camera.right = 120;
				scene.add( light );
				//line







				// scene.add( new THREE.CameraHelper( light.shadow.camera ) );
				//document.addEventListener( 'keydown', onKeyDown, false );
				document.addEventListener( 'keydown', onKeyDown, false );
				document.addEventListener( 'keyup', onKeyUp, false );

			//	document.addEventListener( 'mouse', mouse);


				 window.addEventListener("mousedown", onMouseDown);
			//	window.addEventListener( 'mousemove', onTouchMove );
			//	window.addEventListener( 'touchmove', onTouchMove );

				// ground
				var mesh = new THREE.Mesh( new THREE.PlaneBufferGeometry( 2000, 2000 ), new THREE.MeshPhongMaterial( { color: 0x999999, depthWrite: false } ) );
				mesh.rotation.x = - Math.PI / 2;
				mesh.receiveShadow = true;
				scene.add( mesh );

				var grid = new THREE.GridHelper( 2000, 20, 0x000000, 0x000000 );
				grid.material.opacity = 0.2;
				grid.material.transparent = true;
				scene.add( grid );



				 loader = new THREE.TextureLoader();
					var normal = loader.load( 'js/models/3ds/portalgun/textures/PAS_Cret.jpg' );

					 loader = new THREE.FBXLoader();
						loader.setResourcePath( 'js/models/3ds/portalgun/textures/' );


				// model terrain

				loader.load( 'js/models/fbx/terrain.fbx', function ( object ) {

						mixer = new THREE.AnimationMixer( object );

				//	var action = mixer.clipAction( object.animations[ 0 ] );
				//	action.play();

					object.traverse( function ( child ) {

						if ( child.isMesh ) {

							child.castShadow = true;
							child.receiveShadow = true;

						}

					} );
					object.position.x=210;
					scene.add( object );

				} );

				//
				 loader = new THREE.TextureLoader();
					var normal = loader.load( 'js/models/3ds/portalgun/textures/PAS_Cret.jpg' );

					 loader = new THREE.FBXLoader();
						loader.setResourcePath( 'js/models/3ds/portalgun/textures/' );


				// model terrain

				loader.load( 'js/models/fbx/terrain.fbx', function ( object ) {

						mixer = new THREE.AnimationMixer( object );

				//	var action = mixer.clipAction( object.animations[ 0 ] );
				//	action.play();

					object.traverse( function ( child ) {

						if ( child.isMesh ) {

							child.castShadow = true;
							child.receiveShadow = true;

						}

					} );
					object.position.x=210;
					object.position.z=310;
					scene.add( object );

				} );

				//t26
				//
				 loader = new THREE.TextureLoader();
					var normal = loader.load( 'js/models/3ds/portalgun/textures/Tank_Alpha.jpg' );

					 loader = new THREE.FBXLoader();
						loader.setResourcePath( 'js/models/3ds/portalgun/textures/' );


				// model

				loader.load( 'js/models/fbx/t26_head.fbx', function ( object ) {

					Tank.head=object;

					object.traverse( function ( child ) {

						if ( child.isMesh ) {

							child.castShadow = true;
							child.receiveShadow = true;

						}

					} );

					scene.add( object );

				} );
				//t 26

				// model

				loader.load( 'js/models/fbx/t26_stat.fbx', function ( object ) {


					Tank.stat=object;
					object.traverse( function ( child ) {

						if ( child.isMesh ) {

							child.castShadow = true;
							child.receiveShadow = true;

						}

					} );

					scene.add( object );

				} );

				//
				renderer = new THREE.WebGLRenderer( { antialias: true } );
				renderer.setPixelRatio( window.devicePixelRatio );
				renderer.setSize( window.innerWidth, window.innerHeight );
				renderer.shadowMap.enabled = true;
				container.appendChild( renderer.domElement );

				window.addEventListener( 'resize', onWindowResize, false );

				// stats
				stats = new Stats();
				container.appendChild( stats.dom );

                     emitter = new THREE.Object3D();
                    emitter.position.set(3,-5,200);
                    camera.add(emitter);




				function onMouseDown() {
                      let plasmaBall = new THREE.Mesh(new THREE.SphereGeometry(1, 1, 1), new THREE.MeshBasicMaterial({
                        color: "aqua"
                      }));
                      console.log(plasmaBalls);
                      plasmaBall.position.copy(emitter.getWorldPosition()); // start position - the tip of the weapon
                     plasmaBall.quaternion.copy(camera.quaternion); // apply camera's quaternion
                      scene.add(plasmaBall);
                      plasmaBalls.push(plasmaBall);
                    }


			}


                function onKeyDown( event ) {///!!!!Tank.head.rotation.y +=0.1;break;
                  var moveDistance = 50 * clock.getDelta();
                  event.stopPropagation();

                  switch ( event.keyCode ) {

                      case 38: /*up*/
                      case 87: /*W*/ ;Tank.stat.translateX( 10 );PositionSin();controls.moveForward = true; break;

                      case 40: /*down*/
                      case 83: /*S*/	controls.moveBackward = true;Tank.stat.translateX( -10 );PositionSin(); controls.moveBackward = true;break;

                      case 37: /*left*/
                      case 65: /*A*/Tank.stat.rotation.y +=0.1;controls.Rotation_base_r = true;PositionSin();  break;

                      case 39: /*right*/
                      case 68: /*D*/Tank.stat.rotation.y -=0.1;controls.Rotation_base_l = true;PositionSin(); break;

                      //case 67: /*C*/
                      //case 32: /*space*/
                      //case 17: /*ctrl*/

                  }

              }

              function onKeyUp( event ) {

                  event.stopPropagation();
                  var moveDistance = 50 * clock.getDelta();
                  switch ( event.keyCode ) {

                      case 38: /*up*/
                      case 87: /*W*/controls.moveForward = false;break;

                      case 40: /*down*/
                      case 83: /*S*/controls.moveBackward = false;break;

                      case 37: /*left*/Tank.head.rotation.y +=0.1;controls.Tower_rotation_r = false;break;
                      case 65: /*A*/

                      case 39: /*right*/Tank.head.rotation.y -=0.1;controls.Tower_rotation_l= false;break;
                      case 68: /*D*/

                      //case 67: /*C*/
                      //case 32: /*space*/
                      //case 17: /*ctrl*/
                  }



              }

				function PositionSin(){
					Tank.head.position.x=Tank.stat.position.x;
					Tank.head.position.y=Tank.stat.position.y;
					Tank.head.position.z=Tank.stat.position.z;

				}
			function onWindowResize() {

				camera.aspect = window.innerWidth / window.innerHeight;
				camera.updateProjectionMatrix();

				renderer.setSize( window.innerWidth, window.innerHeight );

			}

			//

		function animate() {

				requestAnimationFrame( animate );
			//	console.log(Tank.head.position.x);
			//	camera.localToWorld(Tank.head.position.x,Tank.head.position.y,Tank.head.position.z);
			//	camera.position.set((Tank.head.position.x),(Tank.head.position.y)+50,Tank.head.position.z);
					var delta = clock.getDelta();

                      plasmaBalls.forEach(b => {
                        b.translateZ(-speed * delta*10); // move along the local z-axis
                      });


				if ( mixer ) mixer.update( delta )
				renderer.render( scene, camera );

				stats.update();

			}
