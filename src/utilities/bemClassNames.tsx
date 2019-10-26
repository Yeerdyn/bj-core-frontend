import { setup, BemCn } from 'bem-cn';

// initializing bem-cn with project-specific options
const bemClassNames = setup({
  mod: '--',
  modValue: '--',
});

// Enforce "bj-" prefix at the beginning of the block name
const prefixedBlock: BemCn = (blockName: string) => {
  const hasPrefix = /^bj-[^-]/.test(blockName);

  return bemClassNames(hasPrefix ? blockName : `bj-${blockName}`);
};

export default prefixedBlock;
