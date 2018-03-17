
function hasMethod(objToChk, methodName) {
	return objToChk && typeof objToChk[methodName] === "function";
}




class OLAPFramework {
	
	constructor(scene, uiHook) {
		this.scene = scene;
		this.inputs = {};
		this.$ui = uiHook;
		this.loadedDesign = null;
		this.inputVals = {};
		this.geometry = new THREE.Object3D();
	}

	openDesign(designObj) {
		if(!hasMethod(designObj, ""))



		this.clearUI();
		this.clearGeometry();
		this.loadedDesign = designObj;
		this.loadUI();
		this.updateGeom();
	}

	clearUI() {
		this.$ui.empty();
	}

	clearGeometry() {
		if (this.geometry == null) return;
		scene.remove(this.geometry);
		this.geometry = null;
	}

	loadUI() {
		var params = this.loadedDesign.inputs.params;
		for (let param of params) {
			this.inputVals[param] = this.loadedDesign.inputs[param].default;	// put the default value into curr state
			this.addUIItem(this.loadedDesign.inputs[param], param);				// add the ui item
			this.$ui.append('<div class="divider"></div>');
		}
	}

	updateGeom() {
		this.scene.remove(this.geometry);
		this.geometry = new THREE.Object3D();
		this.loadedDesign.onParamChange(this.inputVals, this.geometry);
		this.loadedDesign.updateGeom(this.geometry)
		this.scene.add(this.geometry);
	}

	addUIItem(inpConfig, id) {
		if (typeof inpConfig === 'undefined' || typeof inpConfig.type === 'undefined') {
			console.log("Foll registered input doesn't have config: " + id + cnt);
			return;
		}
		switch(inpConfig.type) {
			case "select":
				var html = `<div class="input-field" id="${id}"><select>\n`;
				for(let s of inpConfig.choices) { html += `<option value="${s}">${s}</option>\n`; }
				html += `</select><label>${inpConfig.label}</label></div>\n`;
				var p = this.$ui.append(html);
				$('select').formSelect();										// materilize initialization
				var fw = this;													// cache ref to framework for passing it to the event listening registration
				p.find('#' + id).on('change',function(e){
					fw.inputVals[id] = $('#'+id + ' :selected').text();			// update curr state
					fw.updateGeom();											// trigger an update
				});
				break;
			case "slider":
				var html = `
						    <div class="range-field">
							  <p>${inpConfig.label}</p>
							  <span class="left">${inpConfig.min}</span>
							  <span class="right">${inpConfig.max}</span>
						      <input type="range" min="${inpConfig.min}" max="${inpConfig.max}" id="${id}" />
						    </div>
							`;
				var q = this.$ui.append(html);
				var fw = this;													// cache ref to framework for passing it to the event listening registration
				q.find('#' + id).on('input',function(e){
					fw.inputVals[id] = $(this).val();							// update curr state
					fw.updateGeom();											// trigger an update
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
				var fw = this;													// cache ref to framework for passing it to the event listening registration
				r.find("#" + id).on('change',function(e){
					fw.inputVals[id] = $(this).is(":checked");					// update curr state
					fw.updateGeom();											// trigger an update
				});
				break;
		}
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



// OLAPFramework.prototype.updateGeom = function() {
// 	console.log('aaaaaaaa');
// }

