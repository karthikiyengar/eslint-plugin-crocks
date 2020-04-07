// @ts-check
/**
 * @fileoverview Import order for crocks
 * @author Karthik Iyengar
 */
"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

const { parseFunctionName, identifyCrock, compare } = require("../utils");
const liftA2 = require("crocks/helpers/liftA2");

module.exports = {
  meta: {
    docs: {
      description: "Import order for crocks",
      category: "Fill me in",
      recommended: true,
    },
    fixable: null, // or "code" or "whitespace"
    schema: [
      // fill in your schema
    ],
  },
  create: function (context) {
    const imports = [];

    function registerNode(context, currentNode) {
      imports.push(currentNode);

      if (imports.length > 1) {
        for (let i = imports.length - 1; i >= 0; i--) {
          const previousNode = imports[i];

          const check = liftA2((currentTag) => (previousTag) => {
            const order = compare(currentTag, previousTag);
            if (order === -1) {
              context.report({
                node: currentNode,
                message: `${currentTag} needs to be imported before ${previousTag}`,
              });
            }

            if (
              order === 0 &&
              parseFunctionName(currentNode.source.value).localeCompare(
                parseFunctionName(previousNode.source.value)
              ) === 1
            ) {
              context.report({
                node: currentNode,
                message: "Import groups need to be in alphabetical order",
              });
            }
          });

          check(
            identifyCrock(currentNode.source.value),
            identifyCrock(previousNode.source.value)
          );
        }
      }
    }

    return {
      ImportDeclaration(node) {
        registerNode(context, node);
      },
    };
  },
};
