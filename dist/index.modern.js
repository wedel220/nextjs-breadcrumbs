import React, { useState, useEffect, Fragment } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

var getPathFromUrl = function getPathFromUrl(url) {
  return url.split(/[?#]/)[0];
};

var convertBreadcrumb = function convertBreadcrumb(title, toUpperCase, replaceCharacterList, transformLabel) {
  var transformedTitle = getPathFromUrl(title);

  if (transformLabel) {
    return transformLabel(transformedTitle);
  }

  if (replaceCharacterList) {
    for (var i = 0; i < replaceCharacterList.length; i++) {
      transformedTitle = transformedTitle.replaceAll(replaceCharacterList[i].from, replaceCharacterList[i].to);
    }
  }

  return toUpperCase ? decodeURI(transformedTitle).toUpperCase() : decodeURI(transformedTitle);
};

var defaultProps = {
  useDefaultStyle: false,
  rootLabel: 'Home',
  omitRootLabel: false,
  labelsToUppercase: false,
  replaceCharacterList: [{
    from: '-',
    to: ' '
  }],
  transformLabel: undefined,
  omitIndexList: undefined,
  containerStyle: null,
  containerClassName: '',
  listStyle: null,
  listClassName: '',
  inactiveItemStyle: null,
  inactiveItemClassName: '',
  activeItemStyle: null,
  activeItemClassName: ''
};

var Breadcrumbs = function Breadcrumbs(_ref) {
  var useDefaultStyle = _ref.useDefaultStyle,
      rootLabel = _ref.rootLabel,
      omitRootLabel = _ref.omitRootLabel,
      labelsToUppercase = _ref.labelsToUppercase,
      replaceCharacterList = _ref.replaceCharacterList,
      transformLabel = _ref.transformLabel,
      omitIndexList = _ref.omitIndexList,
      containerStyle = _ref.containerStyle,
      containerClassName = _ref.containerClassName,
      listStyle = _ref.listStyle,
      listClassName = _ref.listClassName,
      inactiveItemStyle = _ref.inactiveItemStyle,
      inactiveItemClassName = _ref.inactiveItemClassName,
      activeItemStyle = _ref.activeItemStyle,
      activeItemClassName = _ref.activeItemClassName;
  var router = useRouter();

  var _useState = useState(null),
      breadcrumbs = _useState[0],
      setBreadcrumbs = _useState[1];

  useEffect(function () {
    if (router) {
      var linkPath = router.asPath.split('/');
      linkPath.shift();
      var pathArray = linkPath.map(function (path, i) {
        return {
          breadcrumb: path,
          href: '/' + linkPath.slice(0, i + 1).join('/')
        };
      });
      setBreadcrumbs(pathArray);
    }
  }, [router]);

  if (!breadcrumbs) {
    return null;
  }

  var index = 1;
  return React.createElement("nav", {
    style: containerStyle,
    className: containerClassName,
    "aria-label": "breadcrumbs"
  }, React.createElement("ol", {
    itemScope: true,
    itemType: "https://schema.org/BreadcrumbList",
    style: listStyle,
    className: useDefaultStyle ? '_2jvtI' : listClassName
  }, !omitRootLabel && React.createElement("li", {
    itemScope: true,
    itemProp: "itemListElement",
    itemType: "https://schema.org/ListItem",
    style: inactiveItemStyle,
    className: inactiveItemClassName
  }, React.createElement(Link, {
    href: "/"
  }, React.createElement("a", {
    itemProp: "item"
  }, React.createElement("span", {
    itemProp: "name"
  }, convertBreadcrumb(rootLabel || 'Home', labelsToUppercase, replaceCharacterList, transformLabel)), React.createElement("meta", {
    itemProp: "position",
    content: "1"
  })))), breadcrumbs.length >= 1 && breadcrumbs.map(function (breadcrumb, i) {
    if (!breadcrumb || breadcrumb.breadcrumb.length === 0 || omitIndexList && omitIndexList.find(function (value) {
      return value === i;
    }) != null) {
      return;
    }

    index++;
    return React.createElement("li", {
      itemScope: true,
      itemProp: "itemListElement",
      itemType: "https://schema.org/ListItem",
      key: breadcrumb.href,
      className: i === breadcrumbs.length - 1 ? activeItemClassName : inactiveItemClassName,
      style: i === breadcrumbs.length - 1 ? activeItemStyle : inactiveItemStyle
    }, i === breadcrumbs.length - 1 ? React.createElement(Fragment, null, React.createElement("span", {
      itemProp: "name"
    }, convertBreadcrumb(breadcrumb.breadcrumb, labelsToUppercase, replaceCharacterList, transformLabel)), React.createElement("meta", {
      itemProp: "position",
      content: "" + index
    })) : React.createElement(Link, {
      href: breadcrumb.href
    }, React.createElement("a", {
      itemProp: "item"
    }, React.createElement("span", {
      itemProp: "name"
    }, convertBreadcrumb(breadcrumb.breadcrumb, labelsToUppercase, replaceCharacterList, transformLabel)), React.createElement("meta", {
      itemProp: "position",
      content: "" + index
    }))));
  })));
};

Breadcrumbs.defaultProps = defaultProps;

export default Breadcrumbs;
//# sourceMappingURL=index.modern.js.map
