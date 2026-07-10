import type { CSSProperties } from 'react';
import LocationIcon from '@/assets/icons/Primary Button/Location02Icon.svg?react';
import CalendarIcon from '@/assets/icons/Primary Button/Calendar04Icon.svg?react';
import {
  Button,
  DatePicker,
  IconButton,
  ImageUpload,
  Input,
  Logo,
  OTPInput,
  PhoneNumberInput,
  Search,
  TextArea,
  TimePicker,
} from './components';

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
        <h2>Icon Button</h2>
        <div style={row}>
          <IconButton variant="primary" icon={LocationIcon} aria-label="Location" />
          <IconButton variant="primary" icon={LocationIcon} aria-label="Location" disabled />
          <IconButton variant="secondary" icon={LocationIcon} aria-label="Location" />
          <IconButton variant="secondary" icon={LocationIcon} aria-label="Location" disabled />
        </div>
      </section>
    </div>
  );
}
