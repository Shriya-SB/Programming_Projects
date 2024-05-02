# Sets is an unordered collection of unique elements.
# Sets are mutable, meaning their elements can be added, removed, or modified.

# Example of set:
a = {2, 5, 7, 8}
print(type(a), a)

# Sets and it's method
print(a.pop(), a)  # Removes the last element of set
print(a.add(8), a)  # It adds the element to starting of the set
print(a.remove(2), a)  # Removes the element given respectively
set1 = {1, 2, 3}
set2 = {3, 4, 5}
set3 = {5, 6, 7}

new_set = set1.union(set2, set3)  # Union method creates a new set but merging all set
print(new_set)  # Output: {1, 2, 3, 4, 5, 6, 7}

set1 = {1, 2, 3}
set2 = {3, 4, 5}
set3 = {5, 6, 7}

set1.update(set2, set3)  # Update method adds all the set and return the old set modified.
print(set1)  # Output: {1, 2, 3, 4, 5, 6, 7}

