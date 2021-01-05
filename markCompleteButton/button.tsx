import * as React from 'react';
import { CommandBarButton, IContextualMenuProps, IIconProps, Stack, IStackStyles } from 'office-ui-fabric-react';

export interface IButtonExampleProps {
  // These are set based on the toggles shown above the examples (not needed in real code)
  disabled?: boolean;
  checked?: boolean;
  onButtonClicked? : () => void;
}

const completeIcon: IIconProps = { iconName: 'Completed' };
const stackStyles: Partial<IStackStyles> = { root: { height: 50 } };
const toggle: boolean = true;
export const ButtonCommandBarExample: React.FunctionComponent<IButtonExampleProps> = props => {
  const { disabled, checked,onButtonClicked } = props;
  return (
      <Stack horizontal styles={stackStyles}>
      <CommandBarButton
        iconProps={completeIcon}
        toggle={toggle}
        text="Complete On Save"
        disabled={disabled}
        checked={checked}
        onClick={onButtonClicked}
        
      /></Stack>
  );
};
