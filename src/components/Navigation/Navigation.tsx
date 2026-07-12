import { useId, useState, type ReactNode } from 'react';
import ArrowDownGlyph from '@/assets/icons/Primary Button/ArrowDown01Icon.svg?react';
import MenuCollapseGlyph from '@/assets/icons/Primary Button/MenuCollapseIcon.svg?react';
import MenuOpenGlyph from '@/assets/icons/Primary Button/MenuOpenseIcon.svg?react';
import { Tooltip } from '../Tooltip';
import styles from './Navigation.module.css';
import type { NavigationItem, NavigationProps } from './Navigation.types';

function HorizontalDropdownItem({
  item,
  onSelect,
}: {
  item: NavigationItem;
  onSelect: (item: NavigationItem) => void;
}) {
  const hasChildren = !!item.children?.length;

  return (
    <div className={styles.hDropdownItemWrapper}>
      <button
        type="button"
        role="menuitem"
        className={styles.hDropdownItem}
        disabled={item.disabled}
        onClick={() => (hasChildren ? undefined : onSelect(item))}
      >
        {item.icon && <item.icon className={styles.hIcon} aria-hidden="true" />}
        <span>{item.label}</span>
        {hasChildren && <ArrowDownGlyph className={styles.hSubChevron} aria-hidden="true" />}
      </button>
      {hasChildren && (
        <div className={styles.hSubDropdown} role="menu">
          {item.children!.map((child) => (
            <HorizontalDropdownItem key={child.key} item={child} onSelect={onSelect} />
          ))}
        </div>
      )}
    </div>
  );
}

function HorizontalItem({
  item,
  activeKey,
  onSelect,
}: {
  item: NavigationItem;
  activeKey?: string;
  onSelect: (item: NavigationItem) => void;
}) {
  const active = item.key === activeKey;
  const hasChildren = !!item.children?.length;

  return (
    <div className={styles.hItemWrapper}>
      <button
        type="button"
        className={[styles.hItem, active && styles.hItemActive].filter(Boolean).join(' ')}
        disabled={item.disabled}
        onClick={() => onSelect(item)}
      >
        {item.icon && <item.icon className={styles.hIcon} aria-hidden="true" />}
        <span>{item.label}</span>
        {hasChildren && <ArrowDownGlyph className={styles.hChevron} aria-hidden="true" />}
      </button>
      {hasChildren && (
        <div className={styles.hDropdown} role="menu">
          {item.children!.map((child) => (
            <HorizontalDropdownItem key={child.key} item={child} onSelect={onSelect} />
          ))}
        </div>
      )}
    </div>
  );
}

interface VerticalTreeProps {
  items: NavigationItem[];
  level: number;
  activeKey?: string;
  openKeys: string[];
  collapsed: boolean;
  onSelect: (item: NavigationItem) => void;
  onToggleOpen: (item: NavigationItem, siblingKeys: string[]) => void;
  baseId: string;
}

function VerticalTree({
  items,
  level,
  activeKey,
  openKeys,
  collapsed,
  onSelect,
  onToggleOpen,
  baseId,
}: VerticalTreeProps) {
  return (
    <div className={styles.vTree} role={level === 0 ? 'tree' : 'group'}>
      {items.map((item) => {
        if (item.type === 'group') {
          return (
            <div key={item.key} className={styles.vGroup}>
              {!collapsed && <div className={styles.vGroupLabel}>{item.label}</div>}
              {item.children && (
                <VerticalTree
                  items={item.children}
                  level={level}
                  activeKey={activeKey}
                  openKeys={openKeys}
                  collapsed={collapsed}
                  onSelect={onSelect}
                  onToggleOpen={onToggleOpen}
                  baseId={baseId}
                />
              )}
            </div>
          );
        }

        const hasChildren = !!item.children?.length;
        const isOpen = openKeys.includes(item.key);
        const active = item.key === activeKey;
        const panelId = `${baseId}-${item.key}-panel`;
        const siblingKeys = items.map((sibling) => sibling.key);

        const button = (
          <button
            type="button"
            className={[
              styles.vItem,
              active && styles.vItemActive,
              item.disabled && styles.vItemDisabled,
            ]
              .filter(Boolean)
              .join(' ')}
            style={collapsed ? undefined : { paddingLeft: 16 + level * 16 }}
            disabled={item.disabled}
            aria-expanded={hasChildren ? isOpen : undefined}
            aria-controls={hasChildren ? panelId : undefined}
            onClick={() => (hasChildren ? onToggleOpen(item, siblingKeys) : onSelect(item))}
          >
            {item.icon && <item.icon className={styles.vIcon} aria-hidden="true" />}
            {!collapsed && <span className={styles.vLabel}>{item.label}</span>}
            {!collapsed && hasChildren && (
              <ArrowDownGlyph
                className={[styles.vChevron, isOpen && styles.vChevronOpen].filter(Boolean).join(' ')}
                aria-hidden="true"
              />
            )}
          </button>
        );

        return (
          <div key={item.key} className={styles.vItemWrapper}>
            {collapsed && level === 0 ? (
              <Tooltip title={item.label} placement="right">
                {button}
              </Tooltip>
            ) : (
              button
            )}
            {hasChildren && !collapsed && (
              <div id={panelId} className={[styles.vPanel, isOpen && styles.vPanelOpen].filter(Boolean).join(' ')}>
                <div className={styles.vPanelInner}>
                  <VerticalTree
                    items={item.children!}
                    level={level + 1}
                    activeKey={activeKey}
                    openKeys={openKeys}
                    collapsed={collapsed}
                    onSelect={onSelect}
                    onToggleOpen={onToggleOpen}
                    baseId={baseId}
                  />
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

export function Navigation({
  items,
  mode = 'horizontal',
  activeKey: activeKeyProp,
  defaultActiveKey,
  onSelect,
  openKeys: openKeysProp,
  defaultOpenKeys,
  onOpenChange,
  accordion = false,
  collapsed: collapsedProp,
  defaultCollapsed = false,
  onCollapsedChange,
  collapsible = false,
  logo,
  logoPosition = 'left',
  menuAlign = 'start',
  actions,
  className,
}: NavigationProps) {
  const baseId = useId();

  const isActiveControlled = activeKeyProp !== undefined;
  const [internalActiveKey, setInternalActiveKey] = useState(defaultActiveKey);
  const activeKey = isActiveControlled ? activeKeyProp : internalActiveKey;

  const isOpenControlled = openKeysProp !== undefined;
  const [internalOpenKeys, setInternalOpenKeys] = useState<string[]>(defaultOpenKeys ?? []);
  const openKeys = isOpenControlled ? openKeysProp : internalOpenKeys;

  const isCollapsedControlled = collapsedProp !== undefined;
  const [internalCollapsed, setInternalCollapsed] = useState(defaultCollapsed);
  const collapsed = isCollapsedControlled ? collapsedProp : internalCollapsed;

  const handleSelect = (item: NavigationItem) => {
    if (item.disabled) return;
    if (!isActiveControlled) setInternalActiveKey(item.key);
    onSelect?.(item.key);
  };

  const handleToggleOpen = (item: NavigationItem, siblingKeys: string[]) => {
    if (item.disabled) return;
    const isOpen = openKeys.includes(item.key);
    let next: string[];
    if (accordion) {
      // Accordion mode only closes open siblings at the same level — ancestors
      // and unrelated branches stay untouched so nested submenus stay reachable.
      const withoutSiblings = openKeys.filter((key) => !siblingKeys.includes(key));
      next = isOpen ? withoutSiblings : [...withoutSiblings, item.key];
    } else {
      next = isOpen ? openKeys.filter((key) => key !== item.key) : [...openKeys, item.key];
    }

    if (!isOpenControlled) setInternalOpenKeys(next);
    onOpenChange?.(next);
  };

  const handleToggleCollapsed = () => {
    const next = !collapsed;
    if (!isCollapsedControlled) setInternalCollapsed(next);
    onCollapsedChange?.(next);
  };

  if (mode === 'vertical') {
    return (
      <nav
        className={[styles.vertical, collapsed && styles.collapsed, className].filter(Boolean).join(' ')}
      >
        {collapsible && (
          <button
            type="button"
            className={styles.collapseToggle}
            onClick={handleToggleCollapsed}
            aria-label={collapsed ? 'Expand menu' : 'Collapse menu'}
          >
            {collapsed ? (
              <MenuOpenGlyph className={styles.collapseIcon} aria-hidden="true" />
            ) : (
              <MenuCollapseGlyph className={styles.collapseIcon} aria-hidden="true" />
            )}
          </button>
        )}
        <VerticalTree
          items={items}
          level={0}
          activeKey={activeKey}
          openKeys={openKeys}
          collapsed={collapsed}
          onSelect={handleSelect}
          onToggleOpen={handleToggleOpen}
          baseId={baseId}
        />
      </nav>
    );
  }

  const menuEl: ReactNode = (
    <div className={styles.hMenu}>
      {items.map((item) => (
        <HorizontalItem key={item.key} item={item} activeKey={activeKey} onSelect={handleSelect} />
      ))}
    </div>
  );

  const leftSlot: ReactNode[] = [];
  const centerSlot: ReactNode[] = [];
  const rightSlot: ReactNode[] = [];

  if (logo) {
    (logoPosition === 'center' ? centerSlot : leftSlot).push(<span key="logo">{logo}</span>);
  }

  const menuTarget = menuAlign === 'center' ? centerSlot : menuAlign === 'end' ? rightSlot : leftSlot;
  menuTarget.push(<span key="menu">{menuEl}</span>);

  if (actions) rightSlot.push(<span key="actions" className={styles.hActions}>{actions}</span>);

  return (
    <nav className={[styles.horizontal, className].filter(Boolean).join(' ')}>
      <div className={styles.hSlot}>{leftSlot}</div>
      <div className={[styles.hSlot, styles.hSlotCenter].join(' ')}>{centerSlot}</div>
      <div className={[styles.hSlot, styles.hSlotEnd].join(' ')}>{rightSlot}</div>
    </nav>
  );
}
