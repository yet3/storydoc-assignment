import styled from "styled-components";
import { Input } from "./input";
import { compareTwoStrings } from "string-similarity";
import {
  ChangeEvent,
  MouseEvent,
  useEffect,
  useId,
  useMemo,
  useState,
  useTransition,
} from "react";

const iconTypes = ["filled", "outlined", "round", "sharp", "two-tone"] as const;
export type IconType = (typeof iconTypes)[number];
export const iconTypeToClassName = (type: IconType) => {
  let base = "material-icons";
  if (type === "filled") return base;
  return `${base}-${type}`;
};

export interface IIcon {
  className: string;
  iconName: string;
}

interface Props {
  onPick: (icon: IIcon) => void;
}

export const IconPicker = ({ onPick }: Props) => {
  const id = useId();
  const [selectedType, setSelectedType] = useState<IconType>("filled");
  const [search, setSearch] = useState("");
  const [, startTransition] = useTransition();
  const [icons, setIcons] = useState<Record<string, number>>({});
  const [isLoadingIcons, setIsLoadingIcons] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const data = await import("material-icons/_data/versions.json");
        setIcons(data as unknown as Record<string, number>);
      } catch (e) {
        console.log("error loading icons:", e);
      }

      setIsLoadingIcons(false);
    })();
  }, []);

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    startTransition(() => {
      setSearch(e.target.value);
    });
  };

  const handleClick = (e: MouseEvent<HTMLUListElement>) => {
    e.preventDefault();

    if (onPick) {
      const el = e.target as HTMLElement;
      if (el.dataset.isIcon) {
        onPick({
          className: el.className,
          iconName: el.innerText,
        });
      }
    }
  };

  const filteredItems = useMemo(() => {
    const iconClass = iconTypeToClassName(selectedType);

    const keys = Object.keys(icons);
    if (search.length === 0)
      return keys.map((iconName) => (
        <StyledListItem key={iconName} role="button">
          <span data-is-icon={true} className={iconClass}>
            {iconName}
          </span>
        </StyledListItem>
      ));

    return keys
      .map((iconName) => ({
        iconName,
        score: compareTwoStrings(search, iconName),
      }))
      .sort((a, b) => b.score - a.score)
      .slice(0, 100)
      .map(({ iconName }) => (
        <StyledListItem key={iconName} role="button">
          <span data-is-icon={true} className={iconClass}>
            {iconName}
          </span>
        </StyledListItem>
      ));
  }, [icons, search, selectedType]);

  return (
    <StyledContainer>
      <h3>Icon picker</h3>
      <Input onChange={handleSearchChange} placeholder="Search for your icon" />
      <IconsTypesList>
        {iconTypes.map((type) => (
          <li key={type}>
            <input
              type="radio"
              checked={selectedType === type}
              onChange={(e) => {
                if (e.target.checked) setSelectedType(type);
              }}
              id={`${id}-${type}`}
            />
            <label htmlFor={`${id}-${type}`}>{type}</label>
          </li>
        ))}
      </IconsTypesList>
      <StyledList onClick={handleClick}>
        {isLoadingIcons ? (
          <StyledIconsLoader>Loading icons...</StyledIconsLoader>
        ) : (
          filteredItems
        )}
      </StyledList>
    </StyledContainer>
  );
};

const StyledContainer = styled.aside`
  font-size: 1em;
  padding: 1em 0.5em;
  border: 1px solid ${({ theme }) => theme.colors.lightGray};
  border-radius: 1px;
  background-color: white;
  border-radius: 0.2em;

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5em;

  width: min-content;
`;

const StyledList = styled.ul`
  font-size: 1em;
  list-style-type: none;

  display: grid;
  grid-template-columns: repeat(9, 30px);
  gap: 0.25em;
  height: 250px;
  overflow-y: scroll;
  overflow-x: hidden;
`;

const StyledListItem = styled.li`
  width: 30px;
  height: 30px;
  font-size: 1em;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 0.2em;

  cursor: pointer;

  span {
    font-size: 2em;
    color: black;
  }
`;

const IconsTypesList = styled.ul`
  font-size: 1em;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 0.5em;

  li {
    display: flex;
    gap: 0.25em;
  }
`;

const StyledIconsLoader = styled.span`
  grid-column: 1/-1;
  align-self: center;
  text-align: center;
`;
