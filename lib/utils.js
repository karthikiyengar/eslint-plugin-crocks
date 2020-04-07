// @ts-check
const First = require("crocks/First");
const mreduceMap = require("crocks/helpers/mreduceMap");
const constant = require("crocks/combinators/constant");
const safeLift = require("crocks/Maybe/safeLift");

// testRegex :: Regex -> String -> Boolean
const testRegex = (regex) => (str) => regex.test(str);

// startsWith :: String -> String -> Boolean
const startsWith = (part) => (str) => str.startsWith(part);

// isCrock :: String -> Boolean
const isCrock = testRegex(/^crocks\/(?!\/)[A-Z]\w+$/);

// isCrockling :: String -> Boolean
const isCrockling = testRegex(/^crocks\/[A-Z].+\/\w+/);

// isHelper :: String -> Boolean
const isHelper = startsWith("crocks/helpers/");

// isPredicate :: String -> Boolean
const isPredicate = startsWith("crocks/predicate/");

// isLogic:: String -> Boolean
const isLogic = startsWith("crocks/logic/");

// isCombinator :: String -> Boolean
const isCombinator = startsWith("crocks/combinators/");

// isPointfree :: String -> Boolean
const isPointfree = startsWith("crocks/pointfree/");

// TAG_ORDER :: [ { tag :: String, test :: Predicate } ]
const TAG_ORDER = [
  {
    tag: "crocks",
    test: isCrock,
  },
  {
    tag: "crocklings",
    test: isCrockling,
  },
  {
    tag: "helpers",
    test: isHelper,
  },
  {
    tag: "predicates",
    test: isPredicate,
  },
  {
    tag: "combinators",
    test: isCombinator,
  },
  {
    tag: "pointfree",
    test: isPointfree,
  },
  {
    tag: "logic",
    test: isLogic,
  },
];

// identifyCrock :: String -> Maybe String
const identifyCrock = (importString) =>
  mreduceMap(
    First,
    ({ tag, test }) => safeLift(test, constant(tag))(importString),
    TAG_ORDER
  );

// parseFunctionName :: String -> String
const parseFunctionName = (importName) => (importName.split('/').slice(-1))[0] || ""


// compare :: String -> String -> Number
const compare = (currentNodeName, previousNodeName) => {
  const currentNodeIndex = TAG_ORDER.findIndex(
    (config) => config.tag === currentNodeName
  );
  const previousNodeIndex = TAG_ORDER.findIndex(
    (config) => config.tag === previousNodeName
  );

  if (currentNodeName > previousNodeName) return 1;
  if (currentNodeIndex === previousNodeIndex) return 0;
  if (currentNodeIndex < previousNodeIndex) return -1;
};

module.exports = {
  isCrock,
  isCrockling,
  isHelper,
  isPredicate,
  isCombinator,
  isPointfree,
  isLogic,
  identifyCrock,
  compare,
  parseFunctionName
};
