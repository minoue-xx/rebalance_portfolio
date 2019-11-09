// JavaScript Array to Emscripten Heap
function _arrayToHeap(typedArray) {
    var numBytes = typedArray.length * typedArray.BYTES_PER_ELEMENT;
    var ptr = Module._malloc(numBytes);
    var heapBytes = new Uint8Array(Module.HEAPU8.buffer, ptr, numBytes);
    heapBytes.set(new Uint8Array(typedArray.buffer));
    return heapBytes;
}
// Emscripten Heap to JavasSript Array
function _heapToArray(heapBytes, array) {
    return new Float64Array(
        heapBytes.buffer,
        heapBytes.byteOffset,
        heapBytes.length / array.BYTES_PER_ELEMENT);
}
// Free Heap
function _freeArray(heapBytes) {
    Module._free(heapBytes.byteOffset);
}