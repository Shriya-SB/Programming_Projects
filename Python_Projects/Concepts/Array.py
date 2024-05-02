# Arrays are the special variable that stores more than one value
from functools import reduce

# Array example:
array = ["Navneet", 5, True, -10]
print(array, type(array))

# Array methods
newArray = ["Navneet", "Shriya", "Santhosh", "Manthan"]
print(len(newArray))  # Returns the length of array
newArray.sort()  # Sorts in alphabetical or in ascending order.
print(newArray)
newArray.reverse()  # Reverses the whole array
print(newArray)
print(newArray.pop(), newArray)  # Eliminates last element of the array
print(newArray.insert(2, 4), newArray)  # Replaces the element from its index with respective parameter
print(newArray.append("Manthan"), newArray)  # Adds new element at the end of an array
print(newArray.remove("Santhosh"), newArray)  # Removes the element with respective parameter
print(newArray.clear(), newArray)  # Clears the whole array
list1 = [1, 2, 3]
list2 = [4, 5, 6]
list1.extend(list2)  # Concatenate both the arrays
print(list1)  # Output: [1, 2, 3, 4, 5, 6]

# Higher Order Array methods. Map, Filter, Reduce

# MAP Method
# Map is a higher order array method. It allows you to apply a given function to each item of an iterable like a (
# list, tuple, or set) and returns a new iterator that yields the results
newl = [1, 11, 22, 66, 1000, 4000000]
newList = list(map(lambda x: (x * x * x), newl))  # Returns the cube of all the elements
print(newList)

# Filter Method
# It allows us to filter an array and the elements returning True will be displayed and other's will be filtered out.
result = list(filter(lambda a: a > 20, newl))  # Returns the element which are greater than 20.
print(result)

# Reduce Method
# It's used to apply a function cumulatively to the items of an iterable, from left to right,
# to reduce the iterable to a single value
output = reduce(lambda a, b: a + b, newl)
print(output)