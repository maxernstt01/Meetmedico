import { useState, type CSSProperties } from 'react';
import LocationIcon from '@/assets/icons/Primary Button/Location02Icon.svg?react';
import CalendarIcon from '@/assets/icons/Primary Button/Calendar04Icon.svg?react';
import ArrowDownIcon from '@/assets/icons/Primary Button/ArrowDown01Icon.svg?react';
import EyeIcon from '@/assets/icons/Primary Button/EyeIcon.svg?react';
import Home02Icon from '@/assets/icons/Primary Button/Home02Icon.svg?react';
import MedicalFileIcon from '@/assets/icons/Primary Button/MedicalFileIcon.svg?react';
import CalendarSetting02Icon from '@/assets/icons/Primary Button/CalendarSetting02Icon.svg?react';
import Settings01Icon from '@/assets/icons/Primary Button/Settings01Icon.svg?react';
import UserIcon from '@/assets/icons/Primary Button/UserIcon.svg?react';
import CheckmarkCircle02Icon from '@/assets/icons/Primary Button/CheckmarkCircle02Icon.svg?react';
import type { DrawerPlacement, NavigationItem } from './components';
import {
  Accordion,
  Alert,
  AppFooter,
  AppHeader,
  Badge,
  Button,
  Checkbox,
  Chip,
  DatePicker,
  Divider,
  Drawer,
  Dropdown,
  DotsLoader,
  IconButton,
  ImageUpload,
  Input,
  Label,
  Logo,
  OTPInput,
  PasswordInput,
  PhoneNumberInput,
  Radio,
  Search,
  Switch,
  Tabs,
  TextArea,
  TimePicker,
  Tooltip,
  Skeleton,
  Spinner,
  Typography,
  Progress,
  Navigation,
  Breadcrumb,
  Pagination,
  Steps,
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

const faqItems = [
  {
    key: 'attend',
    title: 'Who should attend this workshop?',
    children:
      'This workshop is ideal for healthcare professionals, medical students, nursing students, interpreters, and anyone interested in learning Medical Spanish.',
  },
  { key: 'free', title: 'Is the workshop free?', children: 'Yes, the workshop is free to attend.' },
  {
    key: 'spanish',
    title: 'Do I need to know Spanish before attending?',
    children: 'No prior Spanish knowledge is required.',
  },
  {
    key: 'certificate',
    title: 'Will I receive a certificate?',
    children: 'Yes, a certificate of completion will be provided.',
  },
  {
    key: 'recorded',
    title: 'Will the workshop be recorded?',
    children: 'Yes, a recording will be shared with all registered attendees.',
    disabled: true,
  },
];

const navHorizontalItems: NavigationItem[] = [
  { key: 'home', label: 'Home' },
  {
    key: 'professionals',
    label: 'Professionals',
    children: [
      { key: 'doctors', label: 'Doctors' },
      { key: 'interpreters', label: 'Interpreters' },
    ],
  },
  {
    key: 'health-services',
    label: 'Health Services',
    children: [
      { key: 'clinics', label: 'Clinics' },
      { key: 'pharmacies', label: 'Pharmacies' },
    ],
  },
  { key: 'events', label: 'Events' },
];

const navHorizontalIconItems: NavigationItem[] = navHorizontalItems.map((item) => ({
  ...item,
  icon: Home02Icon,
}));

const navHorizontalThreeLevelItems: NavigationItem[] = [
  { key: 'home-3l', label: 'Home' },
  {
    key: 'professionals-3l',
    label: 'Professionals',
    children: [
      {
        key: 'doctors-3l',
        label: 'Doctors',
        children: [
          { key: 'general-3l', label: 'General Physicians' },
          { key: 'specialists-3l', label: 'Specialists' },
          { key: 'surgeons-3l', label: 'Surgeons' },
        ],
      },
      {
        key: 'nurses-3l',
        label: 'Nurses',
        children: [
          { key: 'staff-nurses-3l', label: 'Staff Nurses' },
          { key: 'nurse-practitioners-3l', label: 'Nurse Practitioners' },
        ],
      },
      { key: 'interpreters-3l', label: 'Interpreters' },
    ],
  },
  { key: 'events-3l', label: 'Events' },
];

const navVerticalItems: NavigationItem[] = [
  { key: 'nav-one', label: 'Navigation One', icon: Home02Icon },
  {
    key: 'nav-two',
    label: 'Navigation Two',
    icon: Settings01Icon,
    children: [
      { key: 'nav-two-opt1', label: 'Option 1' },
      { key: 'nav-two-opt2', label: 'Option 2' },
      {
        key: 'nav-two-submenu',
        label: 'Submenu',
        children: [
          { key: 'nav-two-sub-opt1', label: 'Option 1' },
          { key: 'nav-two-sub-opt2', label: 'Option 2' },
          { key: 'nav-two-sub-opt3', label: 'Option 3' },
        ],
      },
      {
        key: 'nav-two-submenu2',
        label: 'Submenu 2',
        children: [
          {
            key: 'nav-two-submenu2-nested',
            label: 'Nested Submenu',
            children: [{ key: 'nav-two-submenu2-nested-opt1', label: 'Option 1' }],
          },
        ],
      },
    ],
  },
  { key: 'nav-three', label: 'Navigation Three', icon: UserIcon, disabled: true },
];

const breadcrumbItems = [
  { key: 'home', label: 'Home', href: '#' },
  { key: 'menu1', label: 'Menu1', href: '#' },
  { key: 'menu2', label: 'Menu2', href: '#' },
  { key: 'menu2b', label: 'Menu2' },
];

const stepsItems = [
  { key: 'finished', title: 'Finished', description: 'This is a content.' },
  { key: 'in-progress', title: 'In Progress', description: 'This is a content.' },
  { key: 'waiting', title: 'Waiting', description: 'This is a content.' },
];

const stepsWithExtraItems = [
  { key: 'finished', title: 'Finished', description: 'This is a content.' },
  { key: 'in-progress', title: 'In Progress', description: 'This is a content.', extra: 'Left 00:00:08' },
  { key: 'waiting', title: 'Waiting', description: 'This is a content.' },
];

const stepsIconItems = [
  { key: 'login', title: 'Login', icon: UserIcon },
  { key: 'verification', title: 'Verification', icon: MedicalFileIcon },
  { key: 'pay', title: 'Pay', icon: CalendarSetting02Icon },
  { key: 'done', title: 'Done', icon: CheckmarkCircle02Icon },
];

const sectionStyle: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: 'var(--spacing-space-12)',
};

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
  display: 'flex',
  flexDirection: 'column',
  gap: 'var(--spacing-space-8)',
};

const subCell: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: 'var(--spacing-space-8)',
};

export default function App() {
  const [chipSelected, setChipSelected] = useState(true);
  const [chipToggled, setChipToggled] = useState(false);
  const [drawerNormal, setDrawerNormal] = useState<{ open: boolean; placement: DrawerPlacement }>({
    open: false,
    placement: 'right',
  });
  const [drawerNoClose, setDrawerNoClose] = useState<{ open: boolean; placement: DrawerPlacement }>({
    open: false,
    placement: 'right',
  });
  const [drawerActions, setDrawerActions] = useState<{ open: boolean; placement: DrawerPlacement }>({
    open: false,
    placement: 'right',
  });
  const [drawerMaskNoneOpen, setDrawerMaskNoneOpen] = useState(false);
  const [drawerMaskBlurOpen, setDrawerMaskBlurOpen] = useState(false);
  const [drawerMaskDimmedOpen, setDrawerMaskDimmedOpen] = useState(false);
  const [drawerLevel1, setDrawerLevel1] = useState<{ open: boolean; placement: DrawerPlacement }>({
    open: false,
    placement: 'right',
  });
  const [drawerLevel2Open, setDrawerLevel2Open] = useState(false);
  const [stepsCurrent, setStepsCurrent] = useState(0);

  const placements: { value: DrawerPlacement; label: string }[] = [
    { value: 'top', label: 'Top' },
    { value: 'right', label: 'Right' },
    { value: 'bottom', label: 'Bottom' },
    { value: 'left', label: 'Left' },
  ];

  return (
    <div
      style={{
        padding: 'var(--spacing-space-24)',
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--spacing-space-24)',
      }}
    >
      <section style={sectionStyle}>
        <Typography variant="h2">Logo</Typography>
        <div style={row}>
          <Logo variant="default" />
          <Logo variant="responsive" />
        </div>
      </section>

      <section style={sectionStyle}>
        <Typography variant="h2">Primary Button</Typography>
        <div style={row}>
          <Button variant="primary" leftIcon={LocationIcon} rightIcon={CalendarIcon}>
            Button Label
          </Button>
          <Button variant="primary" leftIcon={LocationIcon} rightIcon={CalendarIcon} disabled>
            Button Label
          </Button>
        </div>
      </section>

      <section style={sectionStyle}>
        <Typography variant="h2">Secondary Button</Typography>
        <div style={row}>
          <Button variant="secondary" leftIcon={LocationIcon} rightIcon={CalendarIcon}>
            View PDF
          </Button>
          <Button variant="secondary" leftIcon={LocationIcon} rightIcon={CalendarIcon} disabled>
            View PDF
          </Button>
        </div>
      </section>

      <section style={sectionStyle}>
        <Typography variant="h2">Tertiary Button</Typography>
        <div style={row}>
          <Button variant="tertiary" leftIcon={LocationIcon} rightIcon={CalendarIcon}>
            Skip To Home
          </Button>
          <Button variant="tertiary" leftIcon={LocationIcon} rightIcon={CalendarIcon} disabled>
            Skip To Home
          </Button>
        </div>
      </section>

      <section style={sectionStyle}>
        <Typography variant="h2">Error Button</Typography>
        <div style={row}>
          <Button variant="error" leftIcon={LocationIcon} rightIcon={CalendarIcon}>
            Button Label
          </Button>
          <Button variant="error" leftIcon={LocationIcon} rightIcon={CalendarIcon} disabled>
            Button Label
          </Button>
        </div>
      </section>

      <section style={sectionStyle}>
        <Typography variant="h2">Text Input</Typography>
        <div style={inputGrid}>
          <div style={inputCell}>
            <Typography variant="h3">Default</Typography>
            <Input label="Label" required placeholder="Enter here" />
          </div>
          <div style={inputCell}>
            <Typography variant="h3">With Helper Text</Typography>
            <Input label="Label" required placeholder="Enter here" helperText="Support Text" />
          </div>
          <div style={inputCell}>
            <Typography variant="h3">With Helper Text &amp; Icon</Typography>
            <Input
              label="Label"
              required
              placeholder="Enter here"
              helperText="Support Text"
              rightIcon={LocationIcon}
            />
          </div>
          <div style={inputCell}>
            <Typography variant="h3">With Icon (Right)</Typography>
            <Input label="Label" required placeholder="Enter here" rightIcon={LocationIcon} />
          </div>
          <div style={inputCell}>
            <Typography variant="h3">With Icon (Left)</Typography>
            <Input label="Label" required placeholder="Enter here" leftIcon={LocationIcon} />
          </div>
          <div style={inputCell}>
            <Typography variant="h3">Filled</Typography>
            <Input label="Label" required defaultValue="Qadir AK" />
          </div>
          <div style={inputCell}>
            <Typography variant="h3">Error</Typography>
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

      <section style={sectionStyle}>
        <Typography variant="h2">Text Area</Typography>
        <div style={inputCell}>
          <TextArea label="Label" required placeholder="Add description here" maxLength={500} />
        </div>
      </section>

      <section style={sectionStyle}>
        <Typography variant="h2">Date Picker</Typography>
        <div style={inputCell}>
          <DatePicker label="Date" required />
        </div>
        <div style={{ ...inputCell, marginTop: 'var(--spacing-space-12)' }}>
          <Typography variant="h3">Date Range</Typography>
          <DatePicker label="Date" required mode="range" />
        </div>
      </section>

      <section style={sectionStyle}>
        <Typography variant="h2">Time Picker</Typography>
        <div style={inputCell}>
          <TimePicker label="Time" required />
        </div>
      </section>

      <section style={sectionStyle}>
        <Typography variant="h2">Phone Number Input</Typography>
        <div style={inputCell}>
          <PhoneNumberInput label="Mobile Number" required placeholder="Enter here" />
        </div>
      </section>

      <section style={sectionStyle}>
        <Typography variant="h2">Password Input</Typography>
        <div style={inputGrid}>
          <div style={inputCell}>
            <Typography variant="h3">Default</Typography>
            <PasswordInput label="Label" required placeholder="Enter password" />
          </div>
          <div style={inputCell}>
            <Typography variant="h3">Filled</Typography>
            <PasswordInput label="Label" required defaultValue="Gtu6k_kdfj" />
          </div>
          <div style={inputCell}>
            <Typography variant="h3">Error</Typography>
            <PasswordInput
              label="Label"
              required
              defaultValue="Gtu6k_kdfj"
              error
              helperText="Error helper text"
            />
          </div>
          <div style={inputCell}>
            <Typography variant="h3">New Password Creating</Typography>
            <PasswordInput label="Label" required showRequirements placeholder="Enter password" />
          </div>
          <div style={inputCell}>
            <Typography variant="h3">New Password Creating (filled)</Typography>
            <PasswordInput
              label="Label"
              required
              showRequirements
              defaultValue="Gtu6k_kdfj"
            />
          </div>
        </div>
      </section>

      <section style={sectionStyle}>
        <Typography variant="h2">Upload Image</Typography>
        <div style={inputCell}>
          <ImageUpload label="Label" required helperText="Supported file information" />
        </div>
      </section>

      <section style={sectionStyle}>
        <Typography variant="h2">Enter OTP</Typography>
        <div style={inputCell}>
          <OTPInput label="Enter OTP" required />
        </div>
      </section>

      <section style={sectionStyle}>
        <Typography variant="h2">Search</Typography>
        <div style={inputGrid}>
          <div style={inputCell}>
            <Typography variant="h3">Default</Typography>
            <Search placeholder="Search by Location" />
          </div>
          <div style={inputCell}>
            <Typography variant="h3">Filled (with clear)</Typography>
            <Search defaultValue="Token News" />
          </div>
          <div style={{ ...inputCell, width: 320 }}>
            <Typography variant="h3">After search show data</Typography>
            <Search defaultValue="Token News" results={searchResults} />
          </div>
        </div>
      </section>

      <section style={sectionStyle}>
        <Typography variant="h2">Dropdown</Typography>
        <div style={inputGrid}>
          <div style={inputCell}>
            <Typography variant="h3">With Support Text</Typography>
            <Dropdown label="Dropdown" required options={dropdownOptions} helperText="Support Text" />
          </div>
          <div style={inputCell}>
            <Typography variant="h3">Without Support Text</Typography>
            <Dropdown label="Dropdown" required options={dropdownOptions} />
          </div>
          <div style={inputCell}>
            <Typography variant="h3">Normal (open on click)</Typography>
            <Dropdown label="Dropdown" required options={dropdownOptions} />
          </div>
          <div style={inputCell}>
            <Typography variant="h3">Single Select</Typography>
            <Dropdown label="Dropdown" required mode="single" options={dropdownOptions} />
          </div>
          <div style={inputCell}>
            <Typography variant="h3">Multi Select</Typography>
            <Dropdown
              label="Dropdown"
              required
              mode="multi"
              options={dropdownOptions}
              defaultValue={['1', '2']}
            />
          </div>
          <div style={inputCell}>
            <Typography variant="h3">Tertiary</Typography>
            <Dropdown variant="tertiary" label="Dropdown" options={dropdownOptions} />
          </div>
          <div style={inputCell}>
            <Typography variant="h3">Multi-select Picker (selected list showing)</Typography>
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

      <section style={sectionStyle}>
        <Typography variant="h2">Badges</Typography>
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

      <section style={sectionStyle}>
        <Typography variant="h2">Labels</Typography>
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

      <section style={sectionStyle}>
        <Typography variant="h2">Chips</Typography>
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

      <section style={sectionStyle}>
        <Typography variant="h2">Icon Button</Typography>
        <div style={row}>
          <IconButton variant="primary" icon={LocationIcon} aria-label="Location" />
          <IconButton variant="primary" icon={LocationIcon} aria-label="Location" disabled />
          <IconButton variant="secondary" icon={LocationIcon} aria-label="Location" />
          <IconButton variant="secondary" icon={LocationIcon} aria-label="Location" disabled />
        </div>
      </section>

      <section style={sectionStyle}>
        <Typography variant="h2">Divider</Typography>
        <Typography variant="h3">Horizontal</Typography>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-space-16)', maxWidth: 320 }}>
          <Divider />
          <Divider variant="dotted" />
          <Divider variant="dash" />
        </div>

        <Typography variant="h3" style={{ marginTop: 'var(--spacing-space-16)' }}>
          Vertical
        </Typography>
        <div style={{ ...row, height: 24 }}>
          <Divider orientation="vertical" />
          <Divider orientation="vertical" variant="dotted" />
          <Divider orientation="vertical" variant="dash" />
        </div>

        <Typography variant="h3" style={{ marginTop: 'var(--spacing-space-16)' }}>
          With Text
        </Typography>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-space-16)', maxWidth: 320 }}>
          <Divider textAlign="left">Text</Divider>
          <Divider textAlign="center">Text</Divider>
          <Divider textAlign="right">Text</Divider>
          <Divider variant="dotted" textAlign="center">Text</Divider>
          <Divider variant="dash" textAlign="center">Text</Divider>
        </div>
      </section>

      <section style={sectionStyle}>
        <Typography variant="h2">Tabs</Typography>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-space-16)' }}>
          <div style={subCell}>
            <Typography variant="h3">With Icon, With Dropdown</Typography>
            <Tabs
              items={[
                { value: '1', label: 'Meet Medico', icon: EyeIcon, showDropdown: true },
                { value: '2', label: 'Meet Medico', icon: EyeIcon, showDropdown: true },
                { value: '3', label: 'Meet Medico', icon: EyeIcon, showDropdown: true, disabled: true },
              ]}
            />
          </div>
          <div style={subCell}>
            <Typography variant="h3">With Icon, No Dropdown</Typography>
            <Tabs
              items={[
                { value: '1', label: 'Meet Medico', icon: EyeIcon },
                { value: '2', label: 'Meet Medico', icon: EyeIcon },
              ]}
            />
          </div>
          <div style={subCell}>
            <Typography variant="h3">No Icon, No Dropdown</Typography>
            <Tabs
              items={[
                { value: '1', label: 'Meet Medico' },
                { value: '2', label: 'Meet Medico' },
              ]}
            />
          </div>
          <div style={subCell}>
            <Typography variant="h3">Only Icon</Typography>
            <Tabs
              items={[
                { value: '1', icon: EyeIcon, ariaLabel: 'Preview' },
                { value: '2', icon: EyeIcon, ariaLabel: 'Preview' },
              ]}
            />
          </div>
        </div>
      </section>

      <section style={sectionStyle}>
        <Typography variant="h2">Box Tabs</Typography>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-space-16)' }}>
          <div style={subCell}>
            <Typography variant="h3">With Icon, With Dropdown</Typography>
            <Tabs
              variant="box"
              items={[
                { value: '1', label: 'Meet Medico', icon: EyeIcon, showDropdown: true },
                { value: '2', label: 'Meet Medico', icon: EyeIcon, showDropdown: true },
                { value: '3', label: 'Meet Medico', icon: EyeIcon, showDropdown: true, disabled: true },
              ]}
            />
          </div>
          <div style={subCell}>
            <Typography variant="h3">No Icon, No Dropdown</Typography>
            <Tabs
              variant="box"
              items={[
                { value: '1', label: 'Meet Medico' },
                { value: '2', label: 'Meet Medico' },
              ]}
            />
          </div>
          <div style={subCell}>
            <Typography variant="h3">Only Icon</Typography>
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

      <section style={sectionStyle}>
        <Typography variant="h2">Segment Tabs</Typography>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-space-16)' }}>
          <div style={subCell}>
            <Typography variant="h3">With Icon, With Dropdown</Typography>
            <Tabs
              variant="segment"
              items={[
                { value: '1', label: 'Meet Medico', icon: EyeIcon, showDropdown: true },
                { value: '2', label: 'Meet Medico', icon: EyeIcon, showDropdown: true },
                { value: '3', label: 'Meet Medico', icon: EyeIcon, showDropdown: true },
              ]}
            />
          </div>
          <div style={subCell}>
            <Typography variant="h3">No Icon, No Dropdown</Typography>
            <Tabs
              variant="segment"
              items={[
                { value: '1', label: 'Meet Medico' },
                { value: '2', label: 'Meet Medico' },
              ]}
            />
          </div>
          <div style={subCell}>
            <Typography variant="h3">Only Icon</Typography>
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

      <section style={sectionStyle}>
        <Typography variant="h2">Alert Messages</Typography>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--spacing-space-24)' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-space-16)', maxWidth: 320 }}>
            <Typography variant="h3">Primary</Typography>
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
            <Typography variant="h3">Secondary</Typography>
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
            <Typography variant="h3">Primary, Without Icon</Typography>
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
            <Typography variant="h3">Secondary, Without Icon</Typography>
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

      <section style={sectionStyle}>
        <Typography variant="h2">Tool Tip</Typography>
        <div style={{ padding: 'var(--spacing-space-24)' }}>
          <Typography variant="h3">Default</Typography>
          <div style={{ marginBottom: 'var(--spacing-space-24)' }}>
            <Tooltip title="Title" description="A Tooltip Description">
              <Button variant="secondary">Hover me</Button>
            </Tooltip>
          </div>

          <Typography variant="h3">Top</Typography>
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

          <Typography variant="h3">Bottom</Typography>
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

          <Typography variant="h3">Left</Typography>
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

          <Typography variant="h3">Right</Typography>
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

      <section style={sectionStyle}>
        <Typography variant="h2">Checkbox</Typography>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-space-16)' }}>
          <div style={row}>
            <Checkbox label="Default" />
            <Checkbox label="Line, Checked" variant="line" defaultChecked />
            <Checkbox label="Fill, Checked" variant="fill" defaultChecked />
          </div>
          <div style={row}>
            <Checkbox label="Disabled" disabled />
            <Checkbox label="Disabled, Checked (Line)" variant="line" defaultChecked disabled />
            <Checkbox label="Disabled, Checked (Fill)" variant="fill" defaultChecked disabled />
          </div>
        </div>
      </section>

      <section style={sectionStyle}>
        <Typography variant="h2">Radio</Typography>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-space-16)' }}>
          <div style={row}>
            <Radio name="radio-demo-1" label="Default" />
            <Radio name="radio-demo-1" label="Checked" defaultChecked />
          </div>
          <div style={row}>
            <Radio name="radio-demo-2" label="Disabled" disabled />
            <Radio name="radio-demo-2" label="Disabled, Checked" defaultChecked disabled />
          </div>
        </div>
      </section>

      <section style={sectionStyle}>
        <Typography variant="h2">Switch</Typography>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-space-16)' }}>
          <div style={row}>
            <Switch label="Default" />
            <Switch label="Active" defaultChecked />
          </div>
          <div style={row}>
            <Switch label="Disabled" disabled />
            <Switch label="Disabled, Active" defaultChecked disabled />
          </div>
        </div>
      </section>

      <section style={sectionStyle}>
        <Typography variant="h2">App Header</Typography>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-space-24)' }}>
          <div style={subCell}>
            <Typography variant="h3">Main Header</Typography>
            <div style={{ maxWidth: 360, border: '1px solid var(--neutral-100)' }}>
              <AppHeader variant="main" onSearch={() => {}} />
            </div>
          </div>
          <div style={subCell}>
            <Typography variant="h3">Back Button Only</Typography>
            <div style={{ maxWidth: 360, border: '1px solid var(--neutral-100)' }}>
              <AppHeader variant="back" onBack={() => {}} />
            </div>
          </div>
          <div style={subCell}>
            <Typography variant="h3">Back and Action</Typography>
            <div style={{ maxWidth: 360, border: '1px solid var(--neutral-100)' }}>
              <AppHeader
                variant="back"
                onBack={() => {}}
                action={
                  <Button variant="tertiary" onClick={() => {}}>
                    Skip To Home
                  </Button>
                }
              />
            </div>
          </div>
          <div style={subCell}>
            <Typography variant="h3">Back and Label</Typography>
            <div style={{ maxWidth: 360, border: '1px solid var(--neutral-100)' }}>
              <AppHeader variant="back" onBack={() => {}} label="Label" />
            </div>
          </div>
          <div style={subCell}>
            <Typography variant="h3">Back and Label and Supporting Text</Typography>
            <div style={{ maxWidth: 360, border: '1px solid var(--neutral-100)' }}>
              <AppHeader
                variant="back"
                onBack={() => {}}
                label="Label"
                supportingText="1/3 Steps"
              />
            </div>
          </div>
        </div>
      </section>

      <section style={sectionStyle}>
        <Typography variant="h2">App Footer</Typography>
        <div style={{ maxWidth: 360 }}>
          <AppFooter
            items={[
              { value: 'home', label: 'Home', icon: Home02Icon },
              { value: 'records', label: 'My Records', icon: MedicalFileIcon },
              { value: 'events', label: 'Events', icon: CalendarSetting02Icon },
              { value: 'settings', label: 'Settings', icon: Settings01Icon },
              { value: 'profile', label: 'Profile', icon: UserIcon },
            ]}
          />
        </div>
      </section>

      <section style={sectionStyle}>
        <Typography variant="h2">Loader</Typography>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-space-24)' }}>
          <div style={subCell}>
            <Typography variant="h3">Circle Loader</Typography>
            <div style={row}>
              <Spinner size={24} />
              <Spinner size={32} />
              <Spinner size={48} />
            </div>
          </div>
          <div style={subCell}>
            <Typography variant="h3">Dotted Loader</Typography>
            <div style={row}>
              <DotsLoader />
              <DotsLoader size={12} />
            </div>
          </div>
          <div style={subCell}>
            <Typography variant="h3">Skeleton</Typography>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-space-16)', maxWidth: 280 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-space-12)' }}>
                <Skeleton shape="circle" />
                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-space-8)', flex: 1 }}>
                  <Skeleton shape="text" width="60%" />
                  <Skeleton shape="text" width="90%" />
                </div>
              </div>
              <Skeleton shape="rect" height={100} />
            </div>
          </div>
        </div>
      </section>

      <section style={sectionStyle}>
        <Typography variant="h2">Drawer</Typography>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-space-24)' }}>
          <div style={subCell}>
            <Typography variant="h3">Normal</Typography>
            <div style={row}>
              {placements.map((p) => (
                <Button
                  key={p.value}
                  variant="primary"
                  onClick={() => setDrawerNormal({ open: true, placement: p.value })}
                >
                  {p.label}
                </Button>
              ))}
            </div>
          </div>

          <div style={subCell}>
            <Typography variant="h3">Without Close Button</Typography>
            <div style={row}>
              {placements.map((p) => (
                <Button
                  key={p.value}
                  variant="primary"
                  onClick={() => setDrawerNoClose({ open: true, placement: p.value })}
                >
                  {p.label}
                </Button>
              ))}
            </div>
          </div>

          <div style={subCell}>
            <Typography variant="h3">With Actions</Typography>
            <div style={row}>
              {placements.map((p) => (
                <Button
                  key={p.value}
                  variant="primary"
                  onClick={() => setDrawerActions({ open: true, placement: p.value })}
                >
                  {p.label}
                </Button>
              ))}
            </div>
          </div>

          <div style={subCell}>
            <Typography variant="h3">Mask Variants</Typography>
            <div style={row}>
              <Button variant="primary" onClick={() => setDrawerMaskNoneOpen(true)}>
                No Mask
              </Button>
              <Button variant="primary" onClick={() => setDrawerMaskBlurOpen(true)}>
                Blur Mask
              </Button>
              <Button variant="primary" onClick={() => setDrawerMaskDimmedOpen(true)}>
                Dimmed Mask
              </Button>
            </div>
          </div>

          <div style={subCell}>
            <Typography variant="h3">Two-level Drawer</Typography>
            <div style={row}>
              {placements.map((p) => (
                <Button
                  key={p.value}
                  variant="primary"
                  onClick={() => setDrawerLevel1({ open: true, placement: p.value })}
                >
                  {p.label}
                </Button>
              ))}
            </div>
          </div>
        </div>

        <Drawer
          open={drawerNormal.open}
          onClose={() => setDrawerNormal((s) => ({ ...s, open: false }))}
          placement={drawerNormal.placement}
          title="Normal Drawer"
        >
          Some contents...
        </Drawer>

        <Drawer
          open={drawerNoClose.open}
          onClose={() => setDrawerNoClose((s) => ({ ...s, open: false }))}
          placement={drawerNoClose.placement}
          title="Without Close Button"
          closable={false}
        >
          Some contents...
        </Drawer>

        <Drawer
          open={drawerActions.open}
          onClose={() => setDrawerActions((s) => ({ ...s, open: false }))}
          placement={drawerActions.placement}
          title="With Actions"
          onSubmit={() => setDrawerActions((s) => ({ ...s, open: false }))}
          onCancel={() => setDrawerActions((s) => ({ ...s, open: false }))}
        >
          Some contents...
        </Drawer>

        <Drawer
          open={drawerMaskNoneOpen}
          onClose={() => setDrawerMaskNoneOpen(false)}
          title="No Mask"
          mask="none"
        >
          Some contents...
        </Drawer>

        <Drawer
          open={drawerMaskBlurOpen}
          onClose={() => setDrawerMaskBlurOpen(false)}
          title="Blur Mask"
          mask="blur"
        >
          Some contents...
        </Drawer>

        <Drawer
          open={drawerMaskDimmedOpen}
          onClose={() => setDrawerMaskDimmedOpen(false)}
          title="Dimmed Mask"
          mask="dimmed"
        >
          Some contents...
        </Drawer>

        <Drawer
          open={drawerLevel1.open}
          onClose={() => setDrawerLevel1((s) => ({ ...s, open: false }))}
          placement={drawerLevel1.placement}
          title="Multi-level Drawer"
        >
          <Button variant="primary" onClick={() => setDrawerLevel2Open(true)}>
            Open Second Drawer
          </Button>
        </Drawer>

        <Drawer
          open={drawerLevel2Open}
          onClose={() => setDrawerLevel2Open(false)}
          placement={drawerLevel1.placement}
          title="Two-level Drawer"
        >
          This is a two-level drawer.
        </Drawer>
      </section>

      <section style={sectionStyle}>
        <Typography variant="h2">Typography</Typography>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-space-24)' }}>
          <div style={subCell}>
            <Typography variant="h3">Display</Typography>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-space-8)' }}>
              <Typography variant="display" weight="extrabold">
                Display Extra Bold
              </Typography>
              <Typography variant="display" weight="bold">
                Display Bold
              </Typography>
            </div>
          </div>

          <div style={subCell}>
            <Typography variant="h3">Heading H1</Typography>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-space-8)' }}>
              <Typography variant="h1" weight="extrabold">
                Heading H1 Extra Bold
              </Typography>
              <Typography variant="h1" weight="bold">
                Heading H1 Bold
              </Typography>
            </div>
          </div>

          <div style={subCell}>
            <Typography variant="h3">Sub Heading H2</Typography>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-space-8)' }}>
              <Typography variant="h2" weight="bold">
                Sub Heading H2 Bold
              </Typography>
              <Typography variant="h2" weight="semibold">
                Sub Heading H2 Semi Bold
              </Typography>
            </div>
          </div>

          <div style={subCell}>
            <Typography variant="h3">Title H3</Typography>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-space-8)' }}>
              <Typography variant="h3" weight="bold">
                Title H3 Bold
              </Typography>
              <Typography variant="h3" weight="semibold">
                Title H3 Semi Bold
              </Typography>
            </div>
          </div>

          <div style={subCell}>
            <Typography variant="h3">Sub Title H4</Typography>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-space-8)' }}>
              <Typography variant="h4" weight="bold">
                Sub Title H4 Bold
              </Typography>
              <Typography variant="h4" weight="semibold">
                Sub Title H4 Semi Bold
              </Typography>
            </div>
          </div>

          <div style={subCell}>
            <Typography variant="h3">Body P1</Typography>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-space-8)' }}>
              <Typography variant="body" weight="semibold">
                Body Semi Bold
              </Typography>
              <Typography variant="body" weight="regular">
                Body Regular
              </Typography>
            </div>
          </div>

          <div style={subCell}>
            <Typography variant="h3">Label</Typography>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-space-8)' }}>
              <Typography variant="labelCaps" weight="bold">
                Label Caps Bold
              </Typography>
              <Typography variant="label" weight="bold">
                Label Bold
              </Typography>
              <Typography variant="label" weight="medium">
                Label Medium
              </Typography>
              <Typography variant="label" weight="regular">
                Label Regular
              </Typography>
            </div>
          </div>

          <div style={subCell}>
            <Typography variant="h3">Caption</Typography>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-space-8)' }}>
              <Typography variant="caption" weight="semibold">
                Caption Semi Bold
              </Typography>
              <Typography variant="caption" weight="medium">
                Caption Medium
              </Typography>
            </div>
          </div>
        </div>
      </section>

      <section style={sectionStyle}>
        <Typography variant="h2">Progress</Typography>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-space-24)' }}>
          <div style={subCell}>
            <Typography variant="h3">Basic Usage</Typography>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-space-16)', maxWidth: 360 }}>
              <Progress percent={65} status="secondary" />
              <Progress percent={30} status="secondary" size="small" />
            </div>
          </div>

          <div style={subCell}>
            <Typography variant="h3">Task Status</Typography>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-space-16)', maxWidth: 420 }}>
              <Progress percent={55} status="secondary" label="Task In Progress" />
              <Progress percent={100} status="success" label="Task Completed" />
              <Progress percent={35} status="error" label="Task Failed" />
            </div>
          </div>

          <div style={subCell}>
            <Typography variant="h3">Progress-related Descriptions</Typography>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-space-16)', maxWidth: 360 }}>
              <Progress percent={50} status="secondary" />
              <Progress percent={55} status="secondary" info="Loading" loading />
              <Progress percent={100} status="success" />
              <Progress percent={40} status="error" />
            </div>
          </div>

          <div style={subCell}>
            <Typography variant="h3">Circular Progress Bar</Typography>
            <div style={row}>
              <Progress type="circle" percent={68} status="secondary" />
              <Progress type="circle" percent={100} status="success" />
              <Progress type="circle" percent={40} status="error" />
              <Progress type="circle" percent={68} status="secondary" size="small" />
              <Progress type="circle" percent={100} status="success" size="small" />
              <Progress type="circle" percent={40} status="error" size="small" />
            </div>
          </div>

          <div style={subCell}>
            <Typography variant="h3">Content-level Progress Bar</Typography>
            <div style={row}>
              <Progress type="circle" size="micro" percent={40} status="secondary" loading label="In Progress" />
              <Progress type="circle" size="micro" percent={100} status="success" label="Completed" />
              <Progress type="circle" size="micro" percent={40} status="error" label="Exception" />
            </div>
          </div>

          <div style={subCell}>
            <Typography variant="h3">Primary Color</Typography>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-space-16)', maxWidth: 360 }}>
              <Progress percent={72} status="primary" />
              <Progress type="circle" percent={72} status="primary" size="small" />
            </div>
          </div>
        </div>
      </section>

      <section style={sectionStyle}>
        <Typography variant="h2">Accordion</Typography>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-space-24)' }}>
          <div style={subCell}>
            <Typography variant="h3">Borderless (Figma Spec)</Typography>
            <div style={{ maxWidth: 480 }}>
              <Accordion items={faqItems} variant="borderless" defaultActiveKeys={['attend']} />
            </div>
          </div>

          <div style={subCell}>
            <Typography variant="h3">Bordered</Typography>
            <div style={{ maxWidth: 480 }}>
              <Accordion items={faqItems} variant="bordered" />
            </div>
          </div>

          <div style={subCell}>
            <Typography variant="h3">Accordion Mode (single panel open)</Typography>
            <div style={{ maxWidth: 480 }}>
              <Accordion items={faqItems} variant="bordered" accordion />
            </div>
          </div>
        </div>
      </section>

      <section style={sectionStyle}>
        <Typography variant="h2">Navigation</Typography>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-space-24)' }}>
          <div style={subCell}>
            <Typography variant="h3">Horizontal — Logo Center</Typography>
            <div style={{ border: '1px solid var(--neutral-100)', borderRadius: 'var(--radius-border-radius-8)' }}>
              <div style={{ padding: 'var(--spacing-space-16)' }}>
                <Navigation
                  items={navHorizontalItems}
                  mode="horizontal"
                  activeKey="home"
                  logo={<Logo variant="responsive" />}
                  logoPosition="center"
                  menuAlign="start"
                  actions={
                    <>
                      <Button variant="secondary">Register</Button>
                      <Button variant="primary">Login</Button>
                    </>
                  }
                />
              </div>
            </div>
          </div>

          <div style={subCell}>
            <Typography variant="h3">Horizontal — Logo Left, Menu Center</Typography>
            <div style={{ border: '1px solid var(--neutral-100)', borderRadius: 'var(--radius-border-radius-8)' }}>
              <div style={{ padding: 'var(--spacing-space-16)' }}>
                <Navigation
                  items={navHorizontalItems}
                  mode="horizontal"
                  activeKey="home"
                  logo={<Logo variant="responsive" />}
                  logoPosition="left"
                  menuAlign="center"
                  actions={
                    <>
                      <Button variant="secondary">Register</Button>
                      <Button variant="primary">Login</Button>
                    </>
                  }
                />
              </div>
            </div>
          </div>

          <div style={subCell}>
            <Typography variant="h3">Horizontal — Logo Left, Menu Right, With Icons</Typography>
            <div style={{ border: '1px solid var(--neutral-100)', borderRadius: 'var(--radius-border-radius-8)' }}>
              <div style={{ padding: 'var(--spacing-space-16)' }}>
                <Navigation
                  items={navHorizontalIconItems}
                  mode="horizontal"
                  activeKey="home"
                  logo={<Logo variant="responsive" />}
                  logoPosition="left"
                  menuAlign="end"
                />
              </div>
            </div>
          </div>

          <div style={subCell}>
            <Typography variant="h3">Horizontal — 3 Levels (Professionals → Doctors → Specialists)</Typography>
            <div style={{ border: '1px solid var(--neutral-100)', borderRadius: 'var(--radius-border-radius-8)' }}>
              <div style={{ padding: 'var(--spacing-space-16)' }}>
                <Navigation
                  items={navHorizontalThreeLevelItems}
                  mode="horizontal"
                  activeKey="home-3l"
                  logo={<Logo variant="responsive" />}
                  logoPosition="left"
                  menuAlign="center"
                  actions={
                    <>
                      <Button variant="secondary">Register</Button>
                      <Button variant="primary">Login</Button>
                    </>
                  }
                />
              </div>
            </div>
          </div>

          <div style={subCell}>
            <Typography variant="h3">Vertical — Default (accordion submenu, nested levels)</Typography>
            <div
              style={{
                width: 280,
                border: '1px solid var(--neutral-100)',
                borderRadius: 'var(--radius-border-radius-8)',
                padding: 'var(--spacing-space-8)',
              }}
            >
              <Navigation items={navVerticalItems} mode="vertical" defaultOpenKeys={['nav-two']} accordion />
            </div>
          </div>

          <div style={subCell}>
            <Typography variant="h3">Vertical — Collapsible (icon-only rail, hover tooltip)</Typography>
            <div
              style={{
                width: 280,
                border: '1px solid var(--neutral-100)',
                borderRadius: 'var(--radius-border-radius-8)',
                padding: 'var(--spacing-space-8)',
              }}
            >
              <Navigation items={navVerticalItems} mode="vertical" collapsible />
            </div>
          </div>
        </div>
      </section>

      <section style={sectionStyle}>
        <Typography variant="h2">Breadcrumb</Typography>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-space-24)' }}>
          <div style={subCell}>
            <Typography variant="h3">Breadcrumb States</Typography>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-space-16)' }}>
              <div>
                <Typography variant="caption" weight="semibold" color="var(--neutral-500)">
                  Previous Page
                </Typography>
                <Breadcrumb items={[{ key: 'home', label: 'Home', href: '#' }]} />
              </div>
              <div>
                <Typography variant="caption" weight="semibold" color="var(--neutral-500)">
                  Active Page (developer chooses primary or neutral)
                </Typography>
                <div style={row}>
                  <Breadcrumb items={[{ key: 'home', label: 'Home' }]} activeColor="primary" />
                  <Breadcrumb items={[{ key: 'home', label: 'Home' }]} activeColor="neutral" />
                </div>
              </div>
            </div>
          </div>

          <div style={subCell}>
            <Typography variant="h3">Example</Typography>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-space-12)' }}>
              <Breadcrumb items={breadcrumbItems} activeColor="primary" />
              <Breadcrumb items={breadcrumbItems} activeColor="neutral" />
            </div>
          </div>

          <div style={subCell}>
            <Typography variant="h3">In Responsive</Typography>
            <Breadcrumb items={breadcrumbItems} maxItems={2} />
          </div>
        </div>
      </section>

      <section style={sectionStyle}>
        <Typography variant="h2">Pagination</Typography>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-space-24)' }}>
          <div style={subCell}>
            <Typography variant="h3">Pagination Normal</Typography>
            <Pagination total={102} defaultCurrent={1} boundaryCount={3} showTotal pageSize={50} totalItems={109} />
          </div>

          <div style={subCell}>
            <Typography variant="h3">Only Pagination</Typography>
            <Pagination total={102} defaultCurrent={1} boundaryCount={3} />
          </div>

          <div style={subCell}>
            <Typography variant="h3">Pagination With Button + Icon</Typography>
            <Pagination total={102} defaultCurrent={2} boundaryCount={3} prevNext="button" />
          </div>

          <div style={subCell}>
            <Typography variant="h3">Pagination With only icon</Typography>
            <Pagination total={102} defaultCurrent={2} boundaryCount={3} prevNext="icon" />
          </div>

          <div style={subCell}>
            <Typography variant="h3">Responsive Pagination</Typography>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-space-16)' }}>
              <Pagination total={102} defaultCurrent={1} boundaryCount={1} siblingCount={0} />
              <Pagination total={102} defaultCurrent={1} boundaryCount={1} siblingCount={0} prevNext="icon" />
            </div>
          </div>
        </div>
      </section>

      <section style={sectionStyle}>
        <Typography variant="h2">Steps</Typography>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-space-24)' }}>
          <div style={subCell}>
            <Typography variant="h3">Horizontal</Typography>
            <Steps items={stepsItems} current={1} />
          </div>

          <div style={subCell}>
            <Typography variant="h3">Vertical</Typography>
            <div style={{ maxWidth: 320 }}>
              <Steps items={stepsItems} current={1} direction="vertical" />
            </div>
          </div>

          <div style={subCell}>
            <Typography variant="h3">Dot Variant</Typography>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-space-24)' }}>
              <Steps items={stepsItems} current={1} variant="dot" />
              <div style={{ maxWidth: 320 }}>
                <Steps items={stepsItems} current={1} variant="dot" direction="vertical" />
              </div>
            </div>
          </div>

          <div style={subCell}>
            <Typography variant="h3">With Extra Content</Typography>
            <Steps items={stepsWithExtraItems} current={1} />
          </div>

          <div style={subCell}>
            <Typography variant="h3">With Custom Icons</Typography>
            <Steps items={stepsIconItems} current={1} />
          </div>

          <div style={subCell}>
            <Typography variant="h3">Clickable</Typography>
            <Steps items={stepsItems} current={stepsCurrent} onChange={setStepsCurrent} />
          </div>

          <div style={subCell}>
            <Typography variant="h3">Error Status</Typography>
            <Steps
              items={[
                { key: 'a', title: 'Step 1', description: 'This is a content.' },
                { key: 'b', title: 'Step 2', description: 'This is a content.', status: 'error' },
                { key: 'c', title: 'Step 3', description: 'This is a content.' },
              ]}
              current={1}
            />
          </div>
        </div>
      </section>
    </div>
  );
}
