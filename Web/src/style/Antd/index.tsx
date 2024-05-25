import { AntAutocompletes } from './AntAutocompletes';
import { AntDatePicker } from './AntDatePicker';
import { AntDropdown } from './AntDropdown';
import { AntMessage } from './AntMessage';
import { AntModal } from './AntModal';
import { AntPopover } from './AntPopover';
import { AntSidebar } from './AntSidebar';
import { AntTable } from './AntTable';
import { AntdFreeStyle } from './AntdFreeStyle';
import { AntDescriptions } from './Antdescriptions';

const AntdStyle = () => {
  return (
    <>
      <AntDropdown />
      <AntDescriptions />
      <AntModal />
      <AntTable />
      <AntAutocompletes />
      <AntdFreeStyle />
      <AntPopover />
      <AntSidebar />
      <AntDatePicker />
      <AntMessage />
    </>
  );
};

export default AntdStyle;
