/*
THIS IS A GENERATED/BUNDLED FILE BY ESBUILD
if you want to view the source, please visit the github repository of this plugin
*/

var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// main.ts
var main_exports = {};
__export(main_exports, {
  default: () => PrioPlugin
});
module.exports = __toCommonJS(main_exports);
var import_obsidian2 = require("obsidian");

// utils/SettingTab.ts
var import_obsidian = require("obsidian");
var SettingTab = class extends import_obsidian.PluginSettingTab {
  constructor(app, plugin) {
    super(app, plugin);
    this.modified = false;
    this.setAliases = (settings, levelAliasesList) => {
      const inputs = levelAliasesList.querySelectorAll("input");
      const aliases = [];
      inputs.forEach((input) => {
        aliases.push(input.value);
      });
      aliases.map((alias, index) => {
        this.plugin.settings.levelAliases[index] = alias;
      });
    };
    this.generateLevelAliasList = (settings, levelAliasesList, buttons) => {
      var _a;
      levelAliasesList.empty();
      const els = [];
      while (settings.levels > levelAliasesList.children.length) {
        const el = createEl("li", {
          text: `${levelAliasesList.children.length + 1}`,
          cls: "level-aliases-list-item",
          parent: levelAliasesList
        });
        const input = el.createEl("input", {
          cls: "level-aliases-list-item-input",
          value: (_a = settings.levelAliases[levelAliasesList.children.length - 1]) != null ? _a : ""
        });
        input.addEventListener("blur", (event) => {
          var _a2, _b, _c, _d;
          const valid = this.validateLevelAlias(event.target.value, parseInt((_b = (_a2 = event.target.parentElement) == null ? void 0 : _a2.textContent) != null ? _b : "") - 1, settings.levelAliases.slice(0, settings.levels));
          if (valid) {
            this.plugin.settings.levelAliases[parseInt((_d = (_c = event.target.parentElement) == null ? void 0 : _c.textContent) != null ? _d : "") - 1] = event.target.value;
          }
          for (const button of buttons) {
            button.disabled = !valid;
          }
        });
        els.push(el);
      }
      return els;
    };
    this.generatePresetId = () => {
      return Date.now().toString(36) + Math.random().toString(36);
    };
    this.addPreset = async (name, settings, presetList) => {
      var _a, _b, _c;
      if (!name || !settings || !this.presetIsValid(name, (_a = settings.presets) != null ? _a : [], (_c = (_b = this.plugin.settings.presets) == null ? void 0 : _b.length) != null ? _c : 0 - 1)) {
        return;
      }
      if (this.plugin.settings.presets) {
        this.plugin.settings.presets.push({
          id: `${this.generatePresetId()}`,
          name,
          settings: {
            levels: this.plugin.settings.levels,
            levelAliases: this.plugin.settings.levelAliases.slice(0, this.plugin.settings.levels)
          }
        });
      } else {
        this.plugin.settings.presets = [{
          id: `${this.generatePresetId()}`,
          name,
          settings: {
            levels: this.plugin.settings.levels,
            levelAliases: this.plugin.settings.levelAliases.slice(0, this.plugin.settings.levels)
          }
        }];
      }
      this.generatePresetList(this.plugin.settings.presets, presetList);
      await this.plugin.saveSettings();
      await this.plugin.loadSettings();
      new import_obsidian.Notice("Preset applied successfully!");
      this.display();
    };
    this.applyPreset = (preset, presetList) => {
      var _a;
      if (!preset || !presetList) {
        return;
      }
      if (this.plugin.settings.presets) {
        this.plugin.settings.levels = preset.settings.levels.valueOf();
        this.plugin.settings.levelAliases = [...preset.settings.levelAliases];
      }
      this.generatePresetList((_a = this.plugin.settings.presets) != null ? _a : [], presetList);
      this.display();
      new import_obsidian.Notice("Preset applied successfully!");
    };
    this.deletePreset = (preset, presetList) => {
      var _a;
      if (this.plugin.settings.presets) {
        this.plugin.settings.presets.remove(preset);
      }
      this.generatePresetList((_a = this.plugin.settings.presets) != null ? _a : [], presetList);
      this.display();
      new import_obsidian.Notice("Preset deleted successfully!");
    };
    this.overwritePreset = (preset, presetList) => {
      var _a;
      if (!preset || !presetList) {
        return;
      }
      if (this.plugin.settings.presets) {
        this.plugin.settings.presets[this.plugin.settings.presets.indexOf(preset)].settings.levels = this.plugin.settings.levels.valueOf();
        this.plugin.settings.presets[this.plugin.settings.presets.indexOf(preset)].settings.levelAliases = [...this.plugin.settings.levelAliases];
      }
      this.generatePresetList((_a = this.plugin.settings.presets) != null ? _a : [], presetList);
      this.display();
      new import_obsidian.Notice("Preset overwritten successfully!");
    };
    this.generatePresetList = (presets, presetList) => {
      presetList.empty();
      (presets || []).map((preset) => {
        const el = createEl("li", {
          cls: "preset-list-item",
          parent: presetList
        });
        const presetListInput = el.createEl("input", {
          cls: "preset-list-item-input",
          value: preset.name
        });
        presetListInput.addEventListener("change", (event) => {
          if (presets && presets.length >= presetList.children.length - 1 && event.target.parentElement && this.presetIsValid(
            event.target.value,
            presets,
            event.target.parentElement.indexOf(event.target)
          )) {
            presets[presetList.children.length - 1].name = event.target.value;
          }
        });
        const btnGroup = el.createEl("div", {
          cls: "btn-group"
        });
        const applyButton = btnGroup.createEl("button", {
          text: "Apply",
          cls: ["preset-list-item-apply", "btn", "btn-primary"]
        });
        const overwriteButton = btnGroup.createEl("button", {
          text: "Overwrite",
          cls: ["preset-list-item-overwrite", "btn", "btn-primary"]
        });
        const deleteButton = btnGroup.createEl("button", {
          text: "Delete",
          cls: ["preset-list-item-delete", "btn", "mod-danger"]
        });
        applyButton.addEventListener("click", () => {
          this.applyPreset(preset, presetList);
        });
        overwriteButton.addEventListener("click", () => {
          this.overwritePreset(preset, presetList);
        });
        deleteButton.addEventListener("click", () => {
          this.deletePreset(preset, presetList);
        });
        return el;
      });
    };
    this.isValid = (levelAliasesList) => {
      const inputs = levelAliasesList.querySelectorAll("input");
      const aliases = [];
      inputs.forEach((input) => {
        aliases.push(input.value);
      });
      inputs.forEach((input) => {
        if (!this.validateLevelAlias(input.value, aliases.indexOf(input.value), aliases)) {
          return false;
        }
      });
      if (aliases.length !== new Set(aliases).size) {
        new import_obsidian.Notice("Level aliases must be unique.");
        return false;
      }
      if (aliases.some((alias) => alias.length === 0)) {
        new import_obsidian.Notice("Level aliases must not be empty.");
        return false;
      }
      return true;
    };
    this.validateLevelAlias = (alias, index, aliases) => {
      if (aliases.indexOf(alias) != index && aliases.includes(alias)) {
        new import_obsidian.Notice("Alias already exists!");
        return false;
      }
      if (alias.length < 1) {
        new import_obsidian.Notice("Alias must be at least 1 character long!");
        return false;
      }
      if (alias.match(/[^a-zA-Z0-9]/)) {
        new import_obsidian.Notice("Alias must only contain alphanumeric characters!");
        return false;
      }
      return true;
    };
    this.presetIsValid = (preset, presets, index) => {
      if (preset.length < 1) {
        new import_obsidian.Notice("Preset name must be at least 1 character long!");
        return false;
      }
      if (preset.match(/[^a-zA-Z0-9]/)) {
        new import_obsidian.Notice("Preset name must only contain alphanumeric characters!");
        return false;
      }
      const searchPreset = presets.find((p) => p.name === preset);
      if (searchPreset && presets.indexOf(searchPreset) !== index && presets.some((p) => p.name === preset)) {
        new import_obsidian.Notice("Preset name already exists!");
        return false;
      }
      return true;
    };
    this.plugin = plugin;
    this.saveConfirm = new SaveConfirm(this);
    this.addPresetModal = new AddPresetModal(this);
  }
  hide() {
    if (this.modified) {
      this.saveConfirm.setSettingsTab(this);
      this.saveConfirm.open();
      return;
    }
    return super.hide();
  }
  display() {
    var _a;
    const { containerEl } = this;
    this.plugin.registerDomEvent(document, "change", () => {
      this.modified = true;
    });
    containerEl.empty();
    let presets = (_a = this.plugin.settings.presets) != null ? _a : [];
    const saveButton = createEl("button", { text: "Save", cls: ["mod-cta", "mod-primary", "btn"] });
    containerEl.createEl("h2", { text: "General Settings" });
    if (this.plugin.settings.presets) {
      const dropDownOptions = { "default": "Default" };
      this.plugin.settings.presets.map((preset) => {
        return dropDownOptions[preset.id] = preset.name;
      });
      new import_obsidian.Setting(containerEl).setName("Preset").setDesc("Select a preset to use.").addSearch((search) => {
        search.setPlaceholder("Search Presets").onChange(async (value) => {
          var _a2, _b;
          presets = (_b = (_a2 = this.plugin.settings.presets) == null ? void 0 : _a2.filter((preset) => preset.name.toLowerCase().includes(value.toLowerCase()))) != null ? _b : [];
          presetList.empty();
          this.generatePresetList(presets, presetList);
        });
      });
    }
    const presetListContainer = createEl("div", {
      cls: "preset-list-container",
      parent: containerEl
    });
    const presetList = createEl("ol", {
      cls: "preset-list",
      parent: presetListContainer
    });
    const addPresetButton = createEl("button", {
      text: "Add Preset",
      cls: ["mod-cta", "mod-primary", "btn"],
      parent: presetListContainer
    });
    addPresetButton.addEventListener("click", () => {
      this.addPresetModal.setPresetsList(presetList);
      this.addPresetModal.open();
    });
    this.generatePresetList(presets, presetList);
    const levelSliderSetting = new import_obsidian.Setting(containerEl);
    let levelSlider;
    const levelText = createEl("input", {
      value: this.plugin.settings.levels.toString(),
      type: "numeric",
      cls: "level-text",
      parent: levelSliderSetting.settingEl,
      attr: {
        min: 1,
        max: 10,
        step: 1,
        type: "number"
      }
    });
    levelText.addEventListener("change", (event) => {
      let value = parseInt(event.target.value);
      if (value < 1) {
        value = 1;
      }
      if (value > 10) {
        value = 10;
      }
      levelSlider.setValue(value);
      this.plugin.settings.levels = value;
      this.generateLevelAliasList(this.plugin.settings, levelAliasesList, [saveButton]);
    });
    levelSliderSetting.setName("Levels").setDesc("Set the count of priority levels to use.").addSlider((slider) => {
      levelSlider = slider;
      levelSlider.setLimits(1, 10, 1).setValue(this.plugin.settings.levels).onChange(async (value) => {
        this.plugin.settings.levels = value;
        levelText.value = value.toString();
        this.generateLevelAliasList(this.plugin.settings, levelAliasesList, [saveButton]);
      }).setDynamicTooltip();
    });
    new import_obsidian.Setting(containerEl).setName("Level Aliases").setDesc("Set the aliases for each level.");
    const levelAliasesContainer = containerEl.createEl("div");
    const levelAliasesList = createEl("ol", {
      cls: "level-aliases-list",
      parent: levelAliasesContainer
    });
    this.generateLevelAliasList(this.plugin.settings, levelAliasesList, [saveButton]);
    containerEl.append(saveButton);
    saveButton.addEventListener("click", async () => {
      if (!this.isValid(levelAliasesList)) {
        return;
      }
      this.setAliases(this.plugin.settings, levelAliasesList);
      await this.plugin.saveSettings();
      await this.plugin.loadSettings();
      new import_obsidian.Notice("Settings saved successfully!");
      this.modified = false;
    });
  }
};
var SaveConfirm = class extends import_obsidian.Modal {
  constructor(settingsTab) {
    super(settingsTab.app);
    this.settingsTab = settingsTab;
  }
  setSettingsTab(settingsTab) {
    this.settingsTab = settingsTab;
  }
  open() {
    super.open();
  }
  onOpen() {
    const { contentEl } = this;
    contentEl.classList.add("save-confirm-modal");
    contentEl.createEl("h2", {
      text: "Unsaved Changes",
      cls: "save-confirm-title"
    });
    contentEl.createEl("p", {
      text: "You have unsaved changes. Would you like to save them?",
      cls: "save-confirm-text"
    });
    const btnGroup = contentEl.createEl("div", {
      cls: "save-btn-group"
    });
    const saveButton = createEl("button", {
      text: "Save",
      cls: ["btn", "mod-cta"]
    });
    const discardButton = createEl("button", {
      text: "Discard",
      cls: ["btn", "mod-danger"]
    });
    saveButton.addEventListener("click", async () => {
      await this.settingsTab.plugin.saveSettings();
      await this.settingsTab.plugin.loadSettings();
      new import_obsidian.Notice("Settings saved successfully!");
      this.close();
    });
    discardButton.addEventListener("click", async () => {
      await this.settingsTab.plugin.loadSettings();
      new import_obsidian.Notice("Settings discarded successfully!");
      this.close();
    });
    btnGroup.append(saveButton);
    btnGroup.append(discardButton);
  }
  onClose() {
    const { contentEl } = this;
    contentEl.empty();
    this.settingsTab.modified = false;
  }
};
var AddPresetModal = class extends import_obsidian.Modal {
  constructor(settingsTab) {
    super(settingsTab.app);
    this.settingsTab = settingsTab;
  }
  setPresetsList(presetsList) {
    this.presetsList = presetsList;
  }
  open() {
    super.open();
  }
  onOpen() {
    const { contentEl } = this;
    contentEl.classList.add("preset-modal");
    contentEl.createEl("h2", {
      text: "Add Preset",
      cls: "preset-modal-title"
    });
    let presetName = "";
    const presetNameInput = contentEl.createEl("input", {
      cls: "preset-input",
      placeholder: "Preset Name"
    });
    presetNameInput.addEventListener("input", () => {
      if (presetNameInput.value.length > 0) {
        presetNameInput.classList.remove("invalid");
        presetName = presetNameInput.value;
      } else {
        presetNameInput.classList.add("invalid");
      }
    });
    const btnGroup = contentEl.createEl("div", {
      cls: "preset-save-btn-group"
    });
    const addButton = createEl("button", {
      text: "Add",
      cls: ["btn", "mod-cta"]
    });
    const cancelButton = createEl("button", {
      text: "Cancel",
      cls: ["btn"]
    });
    addButton.addEventListener("click", async () => {
      await this.settingsTab.addPreset(presetName, this.settingsTab.plugin.settings, this.presetsList);
      this.close();
    });
    cancelButton.addEventListener("click", () => {
      this.close();
    });
    btnGroup.append(addButton);
    btnGroup.append(cancelButton);
  }
  onClose() {
    const { contentEl } = this;
    contentEl.empty();
  }
};

// utils/Priority.ts
var setPrio = (editor, view, settings) => {
  if (getPrio(editor, view, settings)) {
    return;
  }
  const cursor = editor.getCursor();
  const line = editor.getLine(cursor.line);
  const levelAliases = settings.levelAliases;
  const level = Math.round(settings.levels / 2);
  const levelAlias = levelAliases[level];
  const newLine = `${line} #${levelAlias}`;
  editor.replaceRange(newLine, { line: cursor.line, ch: 0 }, { line: cursor.line, ch: line.length });
  view.editor.focus();
};
var increasePrio = (editor, view, settings) => {
  const currentPrio = getPrio(editor, view, settings);
  if (!currentPrio) {
    setPrio(editor, view, settings);
    return;
  }
  const currentLevelIndex = settings.levelAliases.indexOf(currentPrio);
  replacePrio(editor, view, settings, currentLevelIndex - 1 < 0 ? 0 : currentLevelIndex - 1);
};
var decreasePrio = (editor, view, settings) => {
  const currentPrio = getPrio(editor, view, settings);
  if (!currentPrio) {
    setPrio(editor, view, settings);
    return;
  }
  const currentLevelIndex = settings.levelAliases.indexOf(currentPrio);
  replacePrio(editor, view, settings, currentLevelIndex + 1 > settings.levels - 1 ? settings.levels - 1 : currentLevelIndex + 1);
};
var removePrio = (editor, view, settings) => {
  const cursor = editor.getCursor();
  const line = editor.getLine(cursor.line);
  const newLine = line.replace(`#${getPrio(editor, view, settings)}`, "");
  editor.replaceRange(newLine, { line: cursor.line, ch: 0 }, { line: cursor.line, ch: line.length });
  view.editor.focus();
};
var replacePrio = (editor, view, settings, level) => {
  const cursor = editor.getCursor();
  const line = editor.getLine(cursor.line);
  const levelAliases = settings.levelAliases;
  const levelAlias = levelAliases[level];
  const newLine = line.replace(`#${getPrio(editor, view, settings)}`, `#${levelAlias}`);
  editor.replaceRange(newLine, { line: cursor.line, ch: 0 }, { line: cursor.line, ch: line.length });
  view.editor.focus();
};
var getPrio = (editor, view, settings) => {
  var _a, _b;
  const cursor = editor.getCursor();
  const line = editor.getLine(cursor.line);
  return (_b = (_a = line.match(/#\w+/g)) == null ? void 0 : _a.filter(
    (tag) => Object.values(settings.levelAliases).includes(tag.replace("#", ""))
  ).first()) == null ? void 0 : _b.replace("#", "");
};

// main.ts
var DEFAULT_SETTINGS = {
  levels: 6,
  levelAliases: [
    "Major",
    "Minor",
    "Trivial",
    "Cosmetic",
    "Enhancement",
    "Bug"
  ],
  presets: [{
    id: "default",
    name: "Default",
    settings: {
      levels: 6,
      levelAliases: [
        "Major",
        "Minor",
        "Trivial",
        "Cosmetic",
        "Enhancement",
        "Bug"
      ]
    }
  }]
};
var PrioPlugin = class extends import_obsidian2.Plugin {
  async onload() {
    await this.loadSettings();
    this.addCommand({
      id: "set-prio",
      name: "Set priority",
      editorCallback: (editor, view) => {
        setPrio(editor, view, this.settings);
      }
    });
    this.addCommand({
      id: "remove-prio",
      name: "Remove priority",
      editorCallback: (editor, view) => {
        removePrio(editor, view, this.settings);
      }
    });
    this.addCommand({
      id: "increase-prio",
      name: "Increase priority",
      editorCallback: (editor, view) => {
        increasePrio(editor, view, this.settings);
      }
    });
    this.addCommand({
      id: "decrease-prio",
      name: "Decrease priority",
      editorCallback: (editor, view) => {
        decreasePrio(editor, view, this.settings);
      }
    });
    this.addSettingTab(new SettingTab(this.app, this));
  }
  onunload() {
  }
  async loadSettings() {
    this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
  }
  async saveSettings() {
    await this.saveData(this.settings);
  }
};