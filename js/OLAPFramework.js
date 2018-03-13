
function hasMethod(objToChk, methodName) {
	return objToChk && typeof objToChk[methodName] === "function";
}




class OLAPFramework {
	
	constructor(scene, uiHook) {
		this.scene = scene;
		this.inputs = {};
		this.$ui = uiHook;
		this.geometry = null;

        // this.frameUpdateListeners = [];
	}

	openDesign(designObj) {
		this.clearGeometry();
		this.openGeometry(designObj);
		this.clearUI();
		this.updateUI(designObj);
		// register new inputs
			// hook inputs to geometry and ui
	}

	clearUI() {
		this.$ui.empty();
	}

	updateUI(designObj) {
		var params = designObj.inputs.params;
		for (let param of params) {
			this.addUIItem(designObj.inputs[param], param);
			this.$ui.append('<div class="divider"></div>');
		}
	}

	clearGeometry() {
		if (this.geometry == null) return;
		scene.remove(this.geometry);
		this.geometry = null;
	}

	openGeometry(designObj) {
		var group = new THREE.Group();

		var geometry = new THREE.BoxBufferGeometry( 1, 1, 1 );
		var material = new THREE.MeshBasicMaterial( {color: 0x00ff00} );
		var cubeA = new THREE.Mesh( geometry, material );
		cubeA.position.set( 0, 0, 0 );
		group.add(cubeA);

		this.scene.add(group);
	}

	addUIItem(inpConfig, id) {
		if (typeof inpConfig === 'undefined' || typeof inpConfig.type === 'undefined') {
			// console.log("Foll registered input doesn't have config: " + id + cnt);
			return;
		}
		switch(inpConfig.type) {
			case "select":
				var html = `<div class="input-field" id="${id}"><select>\n`;
				for(let s of inpConfig.choices) { html += `<option value="${s}">${s}</option>\n`; }
				html += `</select><label>${inpConfig.label}</label></div>\n`;
				var p = this.$ui.append(html);
				$('select').formSelect();
				p.find('#' + id).on('change',function(e){
					console.log($('#'+id + ' :selected').text());
				});
				break;
			case "slider":
				var html = `
						    <p class="range-field">
							  <p>${inpConfig.label}</p>
							  <span class="left">${inpConfig.min}</span>
							  <span class="right">${inpConfig.max}</span>
						      <input type="range" min="${inpConfig.min}" max="${inpConfig.max}" id="${id}" />
						    </p>
							`;
				var q = this.$ui.append(html);
				q.find('#' + id).on('input',function(e){
					console.log($(this).val());
				});
				break;
			case "bool":
				var html = `
						    <p>
						      <label>
						        <input type='checkbox' id="${id}"/>
						        <span>${inpConfig.label}</span>
						      </label>
						    </p>
						    `;
				var r = this.$ui.append(html);
				r.find("#" + id).on('change',function(e){
					console.log($(this).is(":checked"));
				});
				break;
		}
	}

	passOnChange(id, newVal) {
		console.log('ssss');
	}

	// beforeFrameUpdate() {
	// 	for(var i=0; i<this.frameUpdateListeners.length; i++) {
	// 		this.frameUpdateListeners[i].beforeFrameUpdate(this.scene);
	// 	}
	// }

	// afterFrameUpdate() {
	// 	for(var i=0; i<this.frameUpdateListeners.length; i++) {
	// 		this.frameUpdateListeners[i].afterFrameUpdate(this.scene);
	// 	}
	// }

	// addFrameUpdateListener(frameUpdateListener) {
	// 	if (!hasMethod(frameUpdateListener, 'beforeFrameUpdate')) {
	// 		console.log('ERROR: Frame Update Listener must implement beforeFrameUpdate function.');
	// 		return;
	// 	}
	// 	if (!hasMethod(frameUpdateListener, 'afterFrameUpdate')) {
	// 		console.log('ERROR: Frame Update Listener must implement afterFrameUpdate function.');
	// 		return;
	// 	}
	// 	this.frameUpdateListeners.push(frameUpdateListener);
	// }

	// removeFrameUpdateListener(frameUpdateListener) {
	// 	this.frameUpdateListeners.remove(frameUpdateListener);
	// }

}

