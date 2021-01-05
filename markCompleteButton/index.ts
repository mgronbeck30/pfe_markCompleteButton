import {IInputs, IOutputs} from "./generated/ManifestTypes";
import {ButtonCommandBarExample,IButtonExampleProps} from "./button";
import * as ReactDOM from "react-dom";
import * as React from "react";
import {initializeIcons} from '@uifabric/icons';

export class markCompleteButton implements ComponentFramework.StandardControl<IInputs, IOutputs> {

	private _notifyOutputChanged: () => void;
	private _currentValue: boolean;
	private _context:ComponentFramework.Context<IInputs>;
	private _inputElement: React.ReactElement;
	private _container: HTMLDivElement;
	private props: IButtonExampleProps = {
		disabled: false,
		checked:false,
		onButtonClicked: this.createButtonOnClickHandler.bind(this), 
	};
	private createButtonOnClickHandler(): void{
		
		this.props.checked = !this.props.checked;
		this.updateOutputIfNeeded(this.props.checked);
		//this._context.navigation.navigateTo(this._entityProps, this._navOptions);
		//this._output = "test";
	}
	/**
	 * Empty constructor.
	 */
	constructor()
	{

	}

	/**
	 * Used to initialize the control instance. Controls can kick off remote server calls and other initialization actions here.
	 * Data-set values are not initialized here, use updateView.
	 * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to property names defined in the manifest, as well as utility functions.
	 * @param notifyOutputChanged A callback method to alert the framework that the control has new outputs ready to be retrieved asynchronously.
	 * @param state A piece of data that persists in one session for a single user. Can be set at any point in a controls life cycle by calling 'setControlState' in the Mode interface.
	 * @param container If a control is marked control-type='standard', it will receive an empty div element within which it can render its content.
	 */
	public init(context: ComponentFramework.Context<IInputs>, notifyOutputChanged: () => void, state: ComponentFramework.Dictionary, container:HTMLDivElement)
	{
		initializeIcons();
		//let _this = this;
		this._container = container;
		this._context = context;
		this._notifyOutputChanged = notifyOutputChanged;
		if(context.parameters.complete)this._currentValue = context.parameters.complete.raw?true:false;
		this.updateOutputIfNeeded(this._currentValue);
	}
	private updateOutputIfNeeded(newValue: boolean): void {
		//this.props.checked = newValue;
		if ((newValue && !this._currentValue) || (!newValue && this._currentValue)) {
			this._currentValue = newValue ? true : false;
			this._notifyOutputChanged();
		}
	}

	/**
	 * Called when any value in the property bag has changed. This includes field values, data-sets, global values such as container height and width, offline status, control metadata values such as label, visible, etc.
	 * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to names defined in the manifest, as well as utility functions
	 */
	public updateView(context: ComponentFramework.Context<IInputs>): void
	{
		ReactDOM.render(
            this._inputElement = React.createElement(ButtonCommandBarExample,this.props),
            this._container
        );
		//this.updateOutputIfNeeded(context.parameters.complete.raw);
	}

	/** 
	 * It is called by the framework prior to a control receiving new data. 
	 * @returns an object based on nomenclature defined in manifest, expecting object[s] for property marked as “bound” or “output”
	 */
	public getOutputs(): IOutputs
	{
		var returnValue = this._currentValue;
		return { complete: returnValue };
	}

	/** 
	 * Called when the control is to be removed from the DOM tree. Controls should use this call for cleanup.
	 * i.e. cancelling any pending remote calls, removing listeners, etc.
	 */
	public destroy(): void
	{
		// Add code to cleanup control if necessary
	}
}