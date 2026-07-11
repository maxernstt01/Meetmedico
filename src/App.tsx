import { useState, type CSSProperties } from 'react';
import LocationIcon from '@/assets/icons/Primary Button/Location02Icon.svg?react';
import CalendarIcon from '@/assets/icons/Primary Button/Calendar04Icon.svg?react';
import ArrowDownIcon from '@/assets/icons/Primary Button/ArrowDown01Icon.svg?react';
import EyeIcon from '@/assets/icons/Primary Button/EyeIcon.svg?react';
import {
  Alert,
  Badge,
  Button,
  Chip,
  DatePicker,
  Divider,
  Dropdown,
  IconButton,
  ImageUpload,
  Input,
  Label,
  Logo,
  OTPInput,
  PasswordInput,
  PhoneNumberInput,
  Search,
  Tabs,
  TextArea,
  TimePicker,
  Tooltip,
} from './components';

const dropdownOptions = Array.from({ length: 7 }, (_, i) => ({
  value: String(i + 1),
  label: `Option ${i + 1}`,
}));

const searchResults = [
  {
    id: '1',
    title: 'Search Title',
    description: 'Notification Description Book sample appointments, access medical...',
  },
  {
    id: '2',
    title: 'Search Title',
    description: 'Notification Description Book sample appointments, access medical...',
  },
  {
    id: '3',
    title: 'Search Title',
    description: 'Notification Description Book sample appointments, access medical...',
  },
];

const row: CSSProperties = {
  display: 'flex',
  gap: 'var(--spacing-space-12)',
  flexWrap: 'wrap',
  alignItems: 'center',
};

const inputGrid: CSSProperties = {
  display: 'flex',
  flexWrap: 'wrap',
  gap: 'var(--spacing-space-24)',
};

const inputCell: CSSProperties = {
  width: 280,
};

export default function App() {
  const [chipSelected, setChipSelected] = useState(true);
  const [chipToggled, setChipToggled] = useState(false);

  return (
    <div
      style={{
        padding: 'var(--spacing-space-24)',
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--spacing-space-24)',
      }}
    >
      <section>
        <h2>Logo</h2>
        <div style={row}>
          <Logo variant="default" />
          <Logo variant="responsive" />
        </div>
      </section>

      <section>
        <h2>Primary Button</h2>
        <div style={row}>
          <Button variant="primary" leftIcon={LocationIcon} rightIcon={CalendarIcon}>
            Button Label
          </Button>
          <Button variant="primary" leftIcon={LocationIcon} rightIcon={CalendarIcon} disabled>
            Button Label
          </Button>
        </div>
      </section>

      <section>
        <h2>Secondary Button</h2>
        <div style={row}>
          <Button variant="secondary" leftIcon={LocationIcon} rightIcon={CalendarIcon}>
            View PDF
          </Button>
          <Button variant="secondary" leftIcon={LocationIcon} rightIcon={CalendarIcon} disabled>
            View PDF
          </Button>
        </div>
      </section>

      <section>
        <h2>Tertiary Button</h2>
        <div style={row}>
          <Button variant="tertiary" leftIcon={LocationIcon} rightIcon={CalendarIcon}>
            Skip To Home
          </Button>
          <Button variant="tertiary" leftIcon={LocationIcon} rightIcon={CalendarIcon} disabled>
            Skip To Home
          </Button>
        </div>
      </section>

      <section>
        <h2>Error Button</h2>
        <div style={row}>
          <Button variant="error" leftIcon={LocationIcon} rightIcon={CalendarIcon}>
            Button Label
          </Button>
          <Button variant="error" leftIcon={LocationIcon} rightIcon={CalendarIcon} disabled>
            Button Label
          </Button>
        </div>
      </section>

      <section>
        <h2>Text Input</h2>
        <div style={inputGrid}>
          <div style={inputCell}>
            <h3>Default</h3>
            <Input label="Label" required placeholder="Enter here" />
          </div>
          <div style={inputCell}>
            <h3>With Helper Text</h3>
            <Input label="Label" required placeholder="Enter here" helperText="Support Text" />
          </div>
          <div style={inputCell}>
            <h3>With Helper Text &amp; Icon</h3>
            <Input
              label="Label"
              required
              placeholder="Enter here"
              helperText="Support Text"
              rightIcon={LocationIcon}
            />
          </div>
          <div style={inputCell}>
            <h3>With Icon (Right)</h3>
            <Input label="Label" required placeholder="Enter here" rightIcon={LocationIcon} />
          </div>
          <div style={inputCell}>
            <h3>With Icon (Left)</h3>
            <Input label="Label" required placeholder="Enter here" leftIcon={LocationIcon} />
          </div>
          <div style={inputCell}>
            <h3>Filled</h3>
            <Input label="Label" required defaultValue="Qadir AK" />
          </div>
          <div style={inputCell}>
            <h3>Error</h3>
            <Input
              label="Label"
              required
              defaultValue="Qadir AK"
              error
              helperText="Error helper text"
            />
          </div>
        </div>
      </section>

      <section>
        <h2>Text Area</h2>
        <div style={inputCell}>
          <TextArea label="Label" required placeholder="Add description here" maxLength={500} />
        </div>
      </section>

      <section>
        <h2>Date Picker</h2>
        <div style={inputCell}>
          <DatePicker label="Date" required />
        </div>
        <div style={{ ...inputCell, marginTop: 'var(--spacing-space-12)' }}>
          <h3>Date Range</h3>
          <DatePicker label="Date" required mode="range" />
        </div>
      </section>

      <section>
        <h2>Time Picker</h2>
        <div style={inputCell}>
          <TimePicker label="Time" required />
        </div>
      </section>

      <section>
        <h2>Phone Number Input</h2>
        <div style={inputCell}>
          <PhoneNumberInput label="Mobile Number" required placeholder="Enter here" />
        </div>
      </section>

      <section>
        <h2>Password Input</h2>
        <div style={inputGrid}>
          <div style={inputCell}>
            <h3>Default</h3>
            <PasswordInput label="Label" required placeholder="Enter password" />
          </div>
          <div style={inputCell}>
            <h3>Filled</h3>
            <PasswordInput label="Label" required defaultValue="Gtu6k_kdfj" />
          </div>
          <div style={inputCell}>
            <h3>Error</h3>
            <PasswordInput
              label="Label"
              required
              defaultValue="Gtu6k_kdfj"
              error
              helperText="Error helper text"
            />
          </div>
          <div style={inputCell}>
            <h3>New Password Creating</h3>
            <PasswordInput label="Label" required showRequirements placeholder="Enter password" />
          </div>
          <div style={inputCell}>
            <h3>New Password Creating (filled)</h3>
            <PasswordInput
              label="Label"
              required
              showRequirements
              defaultValue="Gtu6k_kdfj"
            />
          </div>
        </div>
      </section>

      <section>
        <h2>Upload Image</h2>
        <div style={inputCell}>
          <ImageUpload label="Label" required helperText="Supported file information" />
        </div>
      </section>

      <section>
        <h2>Enter OTP</h2>
        <div style={inputCell}>
          <OTPInput label="Enter OTP" required />
        </div>
      </section>

      <section>
        <h2>Search</h2>
        <div style={inputGrid}>
          <div style={inputCell}>
            <h3>Default</h3>
            <Search placeholder="Search by Location" />
          </div>
          <div style={inputCell}>
            <h3>Filled (with clear)</h3>
            <Search defaultValue="Token News" />
          </div>
          <div style={{ ...inputCell, width: 320 }}>
            <h3>After search show data</h3>
            <Search defaultValue="Token News" results={searchResults} />
          </div>
        </div>
      </section>

      <section>
        <h2>Dropdown</h2>
        <div style={inputGrid}>
          <div style={inputCell}>
            <h3>With Support Text</h3>
            <Dropdown label="Dropdown" required options={dropdownOptions} helperText="Support Text" />
          </div>
          <div style={inputCell}>
            <h3>Without Support Text</h3>
            <Dropdown label="Dropdown" required options={dropdownOptions} />
          </div>
          <div style={inputCell}>
            <h3>Normal (open on click)</h3>
            <Dropdown label="Dropdown" required options={dropdownOptions} />
          </div>
          <div style={inputCell}>
            <h3>Single Select</h3>
            <Dropdown label="Dropdown" required mode="single" options={dropdownOptions} />
          </div>
          <div style={inputCell}>
            <h3>Multi Select</h3>
            <Dropdown
              label="Dropdown"
              required
              mode="multi"
              options={dropdownOptions}
              defaultValue={['1', '2']}
            />
          </div>
          <div style={inputCell}>
            <h3>Tertiary</h3>
            <Dropdown variant="tertiary" label="Dropdown" options={dropdownOptions} />
          </div>
          <div style={inputCell}>
            <h3>Multi-select Picker (selected list showing)</h3>
            <Dropdown
              label="Dropdown"
              required
              mode="multi"
              showSelectedTags
              options={dropdownOptions}
              defaultValue={['1', '2', '3']}
            />
          </div>
        </div>
      </section>

      <section>
        <h2>Badges</h2>
        <div style={row}>
          <Badge variant="neutral">Neutral</Badge>
          <Badge variant="info">Info</Badge>
          <Badge variant="success">Success</Badge>
          <Badge variant="warning">Warning</Badge>
          <Badge variant="error">Error</Badge>
        </div>
        <div style={{ ...row, marginTop: 'var(--spacing-space-12)' }}>
          <Badge variant="neutral" icon={LocationIcon}>Neutral</Badge>
          <Badge variant="info" icon={LocationIcon}>Info</Badge>
          <Badge variant="success" icon={LocationIcon}>Success</Badge>
          <Badge variant="warning" icon={LocationIcon}>Warning</Badge>
          <Badge variant="error" icon={LocationIcon}>Error</Badge>
        </div>
      </section>

      <section>
        <h2>Labels</h2>
        <div style={row}>
          <Label variant="neutral">Neutral</Label>
          <Label variant="info">Info</Label>
          <Label variant="success">Success</Label>
          <Label variant="warning">Warning</Label>
          <Label variant="error">Error</Label>
        </div>
        <div style={{ ...row, marginTop: 'var(--spacing-space-12)' }}>
          <Label variant="neutral" icon={LocationIcon}>Neutral</Label>
          <Label variant="info" icon={LocationIcon}>Info</Label>
          <Label variant="success" icon={LocationIcon}>Success</Label>
          <Label variant="warning" icon={LocationIcon}>Warning</Label>
          <Label variant="error" icon={LocationIcon}>Error</Label>
        </div>
      </section>

      <section>
        <h2>Chips</h2>
        <div style={row}>
          <Chip>Default</Chip>
          <Chip icon={ArrowDownIcon}>Default</Chip>
        </div>
        <div style={{ ...row, marginTop: 'var(--spacing-space-12)' }}>
          <Chip onClick={() => {}}>Normal (hover me)</Chip>
          {chipSelected ? (
            <Chip
              selected
              onClick={() => {}}
              onRemove={() => setChipSelected(false)}
            >
              Selected
            </Chip>
          ) : (
            <Chip onClick={() => setChipSelected(true)}>Click to select</Chip>
          )}
        </div>
        <div style={{ ...row, marginTop: 'var(--spacing-space-12)' }}>
          <Chip
            selected={chipToggled}
            onClick={() => setChipToggled((prev) => !prev)}
            onRemove={() => setChipToggled(false)}
          >
            {chipToggled ? 'Selected' : 'Default / Hover / Click me'}
          </Chip>
        </div>
      </section>

      <section>
        <h2>Icon Button</h2>
        <div style={row}>
          <IconButton variant="primary" icon={LocationIcon} aria-label="Location" />
          <IconButton variant="primary" icon={LocationIcon} aria-label="Location" disabled />
          <IconButton variant="secondary" icon={LocationIcon} aria-label="Location" />
          <IconButton variant="secondary" icon={LocationIcon} aria-label="Location" disabled />
        </div>
      </section>

      <section>
        <h2>Divider</h2>
        <h3>Horizontal</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-space-16)', maxWidth: 320 }}>
          <Divider />
          <Divider variant="dotted" />
          <Divider variant="dash" />
        </div>

        <h3 style={{ marginTop: 'var(--spacing-space-16)' }}>Vertical</h3>
        <div style={{ ...row, height: 24 }}>
          <Divider orientation="vertical" />
          <Divider orientation="vertical" variant="dotted" />
          <Divider orientation="vertical" variant="dash" />
        </div>

        <h3 style={{ marginTop: 'var(--spacing-space-16)' }}>With Text</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-space-16)', maxWidth: 320 }}>
          <Divider textAlign="left">Text</Divider>
          <Divider textAlign="center">Text</Divider>
          <Divider textAlign="right">Text</Divider>
          <Divider variant="dotted" textAlign="center">Text</Divider>
          <Divider variant="dash" textAlign="center">Text</Divider>
        </div>
      </section>

      <section>
        <h2>Tabs</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-space-16)' }}>
          <div>
            <h3>With Icon, With Dropdown</h3>
            <Tabs
              items={[
                { value: '1', label: 'Meet Medico', icon: EyeIcon, showDropdown: true },
                { value: '2', label: 'Meet Medico', icon: EyeIcon, showDropdown: true },
                { value: '3', label: 'Meet Medico', icon: EyeIcon, showDropdown: true, disabled: true },
              ]}
            />
          </div>
          <div>
            <h3>With Icon, No Dropdown</h3>
            <Tabs
              items={[
                { value: '1', label: 'Meet Medico', icon: EyeIcon },
                { value: '2', label: 'Meet Medico', icon: EyeIcon },
              ]}
            />
          </div>
          <div>
            <h3>No Icon, No Dropdown</h3>
            <Tabs
              items={[
                { value: '1', label: 'Meet Medico' },
                { value: '2', label: 'Meet Medico' },
              ]}
            />
          </div>
          <div>
            <h3>Only Icon</h3>
            <Tabs
              items={[
                { value: '1', icon: EyeIcon, ariaLabel: 'Preview' },
                { value: '2', icon: EyeIcon, ariaLabel: 'Preview' },
              ]}
            />
          </div>
        </div>
      </section>

      <section>
        <h2>Box Tabs</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-space-16)' }}>
          <div>
            <h3>With Icon, With Dropdown</h3>
            <Tabs
              variant="box"
              items={[
                { value: '1', label: 'Meet Medico', icon: EyeIcon, showDropdown: true },
                { value: '2', label: 'Meet Medico', icon: EyeIcon, showDropdown: true },
                { value: '3', label: 'Meet Medico', icon: EyeIcon, showDropdown: true, disabled: true },
              ]}
            />
          </div>
          <div>
            <h3>No Icon, No Dropdown</h3>
            <Tabs
              variant="box"
              items={[
                { value: '1', label: 'Meet Medico' },
                { value: '2', label: 'Meet Medico' },
              ]}
            />
          </div>
          <div>
            <h3>Only Icon</h3>
            <Tabs
              variant="box"
              items={[
                { value: '1', icon: EyeIcon, ariaLabel: 'Preview' },
                { value: '2', icon: EyeIcon, ariaLabel: 'Preview' },
              ]}
            />
          </div>
        </div>
      </section>

      <section>
        <h2>Segment Tabs</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-space-16)' }}>
          <div>
            <h3>With Icon, With Dropdown</h3>
            <Tabs
              variant="segment"
              items={[
                { value: '1', label: 'Meet Medico', icon: EyeIcon, showDropdown: true },
                { value: '2', label: 'Meet Medico', icon: EyeIcon, showDropdown: true },
                { value: '3', label: 'Meet Medico', icon: EyeIcon, showDropdown: true },
              ]}
            />
          </div>
          <div>
            <h3>No Icon, No Dropdown</h3>
            <Tabs
              variant="segment"
              items={[
                { value: '1', label: 'Meet Medico' },
                { value: '2', label: 'Meet Medico' },
              ]}
            />
          </div>
          <div>
            <h3>Only Icon</h3>
            <Tabs
              variant="segment"
              items={[
                { value: '1', icon: EyeIcon, ariaLabel: 'Preview' },
                { value: '2', icon: EyeIcon, ariaLabel: 'Preview' },
              ]}
            />
          </div>
        </div>
      </section>

      <section>
        <h2>Alert Messages</h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--spacing-space-24)' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-space-16)', maxWidth: 320 }}>
            <h3>Primary</h3>
            <Alert type="warning">
              Warning message will appear here can be up-to two lines not more than that
            </Alert>
            <Alert type="error">Error message will appear here</Alert>
            <Alert type="info">
              Informative message will appear here can be up-to two lines not more than that
            </Alert>
            <Alert type="success">
              Success message will appear here can be up-to two lines not more than that
            </Alert>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-space-16)', maxWidth: 320 }}>
            <h3>Secondary</h3>
            <Alert type="warning" level="secondary">
              Warning message will appear here can be up-to two lines not more than that
            </Alert>
            <Alert type="error" level="secondary">Error message will appear here</Alert>
            <Alert type="info" level="secondary">
              Informative message will appear here can be up-to two lines not more than that
            </Alert>
            <Alert type="success" level="secondary">
              Success message will appear here can be up-to two lines not more than that
            </Alert>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-space-16)', maxWidth: 320 }}>
            <h3>Primary, Without Icon</h3>
            <Alert type="warning" showIcon={false}>
              Warning message will appear here can be up-to two lines not more than that
            </Alert>
            <Alert type="error" showIcon={false}>Error message will appear here</Alert>
            <Alert type="info" showIcon={false}>
              Informative message will appear here can be up-to two lines not more than that
            </Alert>
            <Alert type="success" showIcon={false}>
              Success message will appear here can be up-to two lines not more than that
            </Alert>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-space-16)', maxWidth: 320 }}>
            <h3>Secondary, Without Icon</h3>
            <Alert type="warning" level="secondary" showIcon={false}>
              Warning message will appear here can be up-to two lines not more than that
            </Alert>
            <Alert type="error" level="secondary" showIcon={false}>Error message will appear here</Alert>
            <Alert type="info" level="secondary" showIcon={false}>
              Informative message will appear here can be up-to two lines not more than that
            </Alert>
            <Alert type="success" level="secondary" showIcon={false}>
              Success message will appear here can be up-to two lines not more than that
            </Alert>
          </div>
        </div>
      </section>

      <section>
        <h2>Tool Tip</h2>
        <div style={{ padding: 'var(--spacing-space-24)' }}>
          <h3>Default</h3>
          <div style={{ marginBottom: 'var(--spacing-space-24)' }}>
            <Tooltip title="Title" description="A Tooltip Description">
              <Button variant="secondary">Hover me</Button>
            </Tooltip>
          </div>

          <h3>Top</h3>
          <div style={{ ...row, gap: 'var(--spacing-space-40)', marginBottom: 'var(--spacing-space-40)' }}>
            <Tooltip title="Title" description="A Tooltip Description" placement="topLeft">
              <Button variant="secondary">TL</Button>
            </Tooltip>
            <Tooltip title="Title" description="A Tooltip Description" placement="top">
              <Button variant="secondary">Top</Button>
            </Tooltip>
            <Tooltip title="Title" description="A Tooltip Description" placement="topRight">
              <Button variant="secondary">TR</Button>
            </Tooltip>
          </div>

          <h3>Bottom</h3>
          <div style={{ ...row, gap: 'var(--spacing-space-40)', marginBottom: 'var(--spacing-space-40)' }}>
            <Tooltip title="Title" description="A Tooltip Description" placement="bottomLeft">
              <Button variant="secondary">BL</Button>
            </Tooltip>
            <Tooltip title="Title" description="A Tooltip Description" placement="bottom">
              <Button variant="secondary">Bottom</Button>
            </Tooltip>
            <Tooltip title="Title" description="A Tooltip Description" placement="bottomRight">
              <Button variant="secondary">BR</Button>
            </Tooltip>
          </div>

          <h3>Left</h3>
          <div style={{ ...row, gap: 'var(--spacing-space-40)', marginBottom: 'var(--spacing-space-40)' }}>
            <Tooltip title="Title" description="A Tooltip Description" placement="leftTop">
              <Button variant="secondary">LT</Button>
            </Tooltip>
            <Tooltip title="Title" description="A Tooltip Description" placement="left">
              <Button variant="secondary">Left</Button>
            </Tooltip>
            <Tooltip title="Title" description="A Tooltip Description" placement="leftBottom">
              <Button variant="secondary">LB</Button>
            </Tooltip>
          </div>

          <h3>Right</h3>
          <div style={{ ...row, gap: 'var(--spacing-space-40)' }}>
            <Tooltip title="Title" description="A Tooltip Description" placement="rightTop">
              <Button variant="secondary">RT</Button>
            </Tooltip>
            <Tooltip title="Title" description="A Tooltip Description" placement="right">
              <Button variant="secondary">Right</Button>
            </Tooltip>
            <Tooltip title="Title" description="A Tooltip Description" placement="rightBottom">
              <Button variant="secondary">RB</Button>
            </Tooltip>
          </div>
        </div>
      </section>
    </div>
  );
}
