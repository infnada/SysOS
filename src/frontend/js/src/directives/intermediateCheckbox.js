(function () {
	'use strict';
	SysOS.directive('indeterminateCheckbox', [function () {

		return {
			restrict: 'A',
			scope: {
				node: '='
			},
			link: function (scope, element) {

				function getAllChildren(node,arr) {
					if(!node) return;
					arr.push(node);

					if(node.items) {
						//if the node has children call getSelected for each and concat to array
						node.items.forEach(function(childNode) {
							arr = arr.concat(getAllChildren(childNode,[]))
						})
					}
					return arr;
				}

				scope.$watch('node', function () {

					var flattenedTree = getAllChildren(scope.node, []);
					flattenedTree = flattenedTree.map(function (node) {
						return node.isSelected
					});

					var compactedTree = flattenedTree.filter(function (node) {
						return node === true;
					});

					var r = compactedTree.length > 0 && compactedTree.length < flattenedTree.length;
					element.prop('indeterminate', r);

				}, true);

			}
		}
	}]);
}());