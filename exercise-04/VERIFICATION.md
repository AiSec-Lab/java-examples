# Simulation verification — Exercise 4

Verified against the original Java programs using Temurin Java 21. Embedded source and every console output line match the Java source and expected-output files.

Java Debug Interface stepping was used to compare each object-field and static-field change sequence with the simulation. All sequences match. Executed source statements are represented, including multi-line print argument evaluation, constructor delegation, implicit Object construction, field initialization, method returns, caller assignments, and reference reassignment.

Browser verification checks every step's active line, expression focus box, variables/object state, read highlights, and console output. Previous navigation preserves the execution arrow's direction; scrolling keeps the arrow attached to its lines. Playback restarted at the last step now immediately displays step one. Desktop and narrow-screen rendering were checked with no JavaScript errors.
